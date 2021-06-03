import React from 'react'

const PersonDetails=({person})=>{

    return(
           <div>
            <table>
                <tbody>
                   <tr>
                      <td>{person.name} </td>
                      <td>{person.number}</td>
                   </tr>
               </tbody>
           </table>
           </div>

    )

}

export default PersonDetails