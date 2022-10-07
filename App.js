import React, {useEffect} from 'react';
import RootApp from './RootApp';
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <>
      <RootApp />
      <Toast />
    </>
  );
};

export default App;
