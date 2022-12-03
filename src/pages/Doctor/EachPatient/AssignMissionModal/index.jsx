import { Dialog } from 'primereact/dialog'
import { useEffect, useState } from 'react'
import { Checkbox } from 'primereact/checkbox'
import { Calendar } from 'primereact/calendar'
import { getExamName } from 'utils/getName'
import { Button } from 'primereact/button'
import api from 'utils/api'
import formatDate from 'utils/formatDate'

export default function AssignMissionModal({
  uid,
  assignModalShow,
  setAssignModalShow,
  concatRecords,
}) {
  const [dueDate, setDueDate] = useState(new Date())
  const [checkedExams, setCheckedExam] = useState([])

  function onChange(id) {
    const index = checkedExams.indexOf(id)
    if (index === -1) setCheckedExam([...checkedExams, id])
    else setCheckedExam(checkedExams.filter((eid) => eid !== id))
  }

  function checkData() {
    return !!checkedExams.length && dueDate > new Date()
  }

  function finish() {
    if (checkData()) {
      api('assign-mission', 'POST', {
        user_id: uid,
        due_date: formatDate(dueDate),
        categories: checkedExams,
      })
        .then((json) => {
          concatRecords(json.records)
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setAssignModalShow(false)
        })
    }
  }

  const footer = (
    <div>
      <Button
        className="p-button-secondary p-button-text"
        label="取消"
        onClick={() => setAssignModalShow(true)}
      />
      <Button label="指派" onClick={finish} disabled={!checkData()} />
    </div>
  )

  return (
    <Dialog
      header="指派檢測任務"
      footer={footer}
      visible={assignModalShow}
      style={{ width: '350px' }}
      onHide={() => setAssignModalShow(false)}
    >
      <h3>期限</h3>
      {dueDate <= new Date() && (
        <div style={{ color: 'red' }}>日期期限需晚於今天</div>
      )}
      <Calendar
        id="basic"
        dateFormat="yy/mm/dd"
        value={dueDate}
        onChange={(e) => setDueDate(e.value)}
        placeholder="請輸入日期"
      />
      <h3>項目</h3>

      {[...new Array(4)].map((_, idx) => {
        const id = idx + 1
        return (
          <div key={id} style={{ display: 'flex', gap: 5, marginBottom: 10 }}>
            <Checkbox
              inputId={`check_${id}`}
              name={getExamName(id)}
              value={id}
              onChange={() => onChange(id)}
              checked={checkedExams.indexOf(id) !== -1}
            />
            <label htmlFor={`check_${id}`}>{getExamName(id)}</label>
          </div>
        )
      })}
    </Dialog>
  )
}
