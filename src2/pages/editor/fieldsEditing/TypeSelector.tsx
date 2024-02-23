import React, { useState } from 'react'
import Styles from "./TypeSelector.module.css"
import Button from '../../../compoenents/Button'
const fieldTypes=[
  {id:"text",name:"Text"},
  {id:"number",name:"Number"},
  {id:"label",name:"Label"},
  {id:"divider",name:"Divider"},
  {id:"checkbox",name:"CheckBox"},
  {id:"list",name:"DropDown List"},
  {id:"radiolist",name:"Radio List"},
  {id:"date",name:"Date"},
  {id:"datetime",name:"Date and Time"},
]


interface Props{
  onSelect:(value:string)=>void
}
const TypeSelector = ({onSelect}:Props) => {

  const [selected,setSelected]=useState<string>("")

  const handleChange=(e: React.ChangeEvent<HTMLSelectElement>)=>{
    setSelected(e.target.value)
  }

  return (
    <div className={Styles['select-container']}>
      
      <select size={fieldTypes.length} onChange={handleChange} value={selected}>
        {fieldTypes.map((fieldType) => (
          <option key={fieldType.id} value={fieldType.id}>{fieldType.name}</option>
        ))}
      </select>

          <Button color='green' onClick={()=>{onSelect(selected)}} text='ok' />
    </div>
  )
}

export default TypeSelector