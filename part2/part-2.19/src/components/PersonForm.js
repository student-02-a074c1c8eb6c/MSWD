import React from 'react'

const PersonForm=(props)=>{

    return(
      <>
     <form onSubmit={props.onSubmit}>
      <h2>add a new</h2>
        <div>
          name: &nbsp; &nbsp; &nbsp;<input value={props.valueName} onChange={props.onChangeName}/>
        </div><br/>
        <div>number:&nbsp;&nbsp;&nbsp;<input type='tel' pattern="[0-9\-]+" value={props.valueNumber} onChange={props.onChangeNumber}/></div>
        <div><br />
          <button type="submit">add</button>
        </div><br/>
      </form>

          </>
     

    )

}

export default PersonForm