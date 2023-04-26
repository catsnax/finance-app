import {useLocation} from 'react-router-dom';


function DetailsLoan(){

    const location = useLocation();
    console.log(location.state.data);

    /*const rows = realData.map(item => (
        <tr key={item.id}>
          <td> <button onClick =  {() => {handleClick(item)}}> view history</button></td>
          <td>{item.name}</td>
          <td>{item.totalLoan}</td>
          <td>{item.interestRate}</td>
          <td>{item.payDate}</td>
          <td> {item.nextPayAmount}</td>
          <td> {item.payDateArray[0]}</td>
        
        </tr>
      )); */

    return ( 
        <div> {location.state.data.interestRate}</div>



     );
}
 
export default DetailsLoan;