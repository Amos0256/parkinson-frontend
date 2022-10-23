import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Menubar } from "primereact/menubar";

export default function Header({ title }) {
  const items = [
    {
      label: "File",
      icon: "pi pi-fw pi-file",
      items: [
        {
          label: "Upload",
          icon: "pi pi-fw pi-plus",
          items: [
            {
              label: "Bookmark",
              icon: "pi pi-fw pi-bookmark",
            },
            {
              label: "Video",
              icon: "pi pi-fw pi-video",
            },
          ],
        },
        {
          label: "Delete",
          icon: "pi pi-fw pi-trash",
        },
        {
          separator: true,
        },
        {
          label: "Export",
          icon: "pi pi-fw pi-external-link",
        },
      ],
    },
    {
      label: "Users",
      icon: "pi pi-fw pi-user",
      items: [
        {
          label: "New",
          icon: "pi pi-fw pi-user-plus",
        },
        {
          label: "Delete",
          icon: "pi pi-fw pi-user-minus",
        },
      ],
    },

    {
      label: "Quit",
      icon: "pi pi-fw pi-power-off",
    },
  ];
  return (
    <div>
      <Menubar
        model={items}
        start={
          <>
            <span style={{marginRight:"20px", fontSize:"1.5rem"}}>{title}</span>
            <InputText placeholder="Search" type="text" />
          </>
        }
        end={<Button label="Logout" icon="pi pi-power-off" />}
      />
    </div>
  );
}
