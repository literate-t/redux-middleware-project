import { useNavigate } from 'react-router-dom';

function NavigateHook() {
  const navigate = useNavigate();
  return navigate;
}

export default NavigateHook;
