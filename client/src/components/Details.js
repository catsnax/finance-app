import {useLocation} from 'react-router-dom';


function DetailsLoan(){

    const location = useLocation();

    return ( 
        <div> {location.state.name}</div>



     );
}
 
export default DetailsLoan;