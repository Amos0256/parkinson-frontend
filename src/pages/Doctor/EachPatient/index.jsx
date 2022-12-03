import Header from 'components/Header'
import useAuth from 'hooks/useAuth'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { Dropdown } from 'primereact/dropdown'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from 'utils/api'
import AssignMissionModal from './AssignMissionModal'
import ExamDataTable from './ExamDataTable/inedx'

export default function EachPatient() {
  const { loading, isLogin, user } = useAuth()
  const { id } = useParams()
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState({})
  const [profileModalShow, setProfileModalShow] = useState(false)
  const [assignModalShow, setAssignModalShow] = useState(false)
  const [table, setTable] = useState([])

  useEffect(() => {
    if (loading) return
    if (isLogin) {
      if (user.roles[0].id === 2) {
        navigate('/patient')
      }
    } else {
      navigate('/login')
    }

    api(`users/${id}`, 'GET')
      .then((json) => {
        setCurrentUser(json)
        api(`records`, 'GET')
          .then((json) => {
            setTable(json.filter((item) => item.user_id == id))
          })
          .catch((e) => {
            alert(e.message)
            navigate('/login')
          })
      })
      .catch((e) => {
        alert(e.message)
        navigate('/login')
      })

    api(`users/${id}`, 'GET')
      .then((json) => {
        setCurrentUser(json)
        api(`records`, 'GET')
          .then((json) => {
            setTable(json.filter((item) => item.user_id === parseInt(id)))
          })
          .catch((e) => {
            alert(e.message)
            navigate('/login')
          })
      })
      .catch((e) => {
        alert(e.message)
        navigate('/login')
      })
  }, [isLogin, loading])

  function concatRecords(records) {
    setTable([...table, ...records])
  }

  return (
    <div>
      <Header />
      <div style={{ padding: 10 }}>
        <Button
          onClick={() => setProfileModalShow(true)}
          label="個人資料"
          icon="pi pi-user"
          iconPos="left"
          className="p-button-secondary p-button-text"
        />
        <Button
          onClick={() => setAssignModalShow(true)}
          label="指派檢測任務"
          icon="pi pi-calendar-plus"
          iconPos="left"
          className="p-button-secondary p-button-text"
        />
        <Button
          label="重置密碼"
          icon="pi pi-refresh"
          iconPos="left"
          className="p-button-secondary p-button-text"
        />
      </div>
      <ExamDataTable data={table} />
      <Dialog
        header="個人資料"
        visible={profileModalShow}
        style={{ width: '50vw' }}
        onHide={() => setProfileModalShow(false)}
      >
        {JSON.stringify(currentUser)}
      </Dialog>
      <AssignMissionModal
        uid={id}
        assignModalShow={assignModalShow}
        setAssignModalShow={setAssignModalShow}
        concatRecords={concatRecords}
      />
    </div>
  )
}
