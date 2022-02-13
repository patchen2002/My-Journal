import React from 'react';
import HomeScreen from './screens/HomeScreen';
import SignInScreen from './screens/SignInScreen';
import ProfileScreen from './screens/ProfileScreen';
import PersonalEntriesScreen from './screens/PersonalEntriesScreen';
import { BrowserRouter, Route } from 'react-router-dom';
import NewEntryScreen from './screens/NewEntryScreen';
import EditEntryScreen from './screens/EditEntryScreen';
import SharedEntriesScreen from './screens/SharedEntriesScreen';

function App() {
  return (
    <BrowserRouter>
      <Route path="/" component={HomeScreen} exact></Route>
      <Route path="/signin" component={SignInScreen}></Route>
      <Route path="/profile" component={ProfileScreen}></Route>
      <Route path="/personalEntries" component={PersonalEntriesScreen}></Route>
      <Route path="/newEntry" component={NewEntryScreen}></Route>
      <Route path="/editEntry/:id" component={EditEntryScreen}></Route>
      <Route path="/sharedEntries" component={SharedEntriesScreen}></Route>
    </BrowserRouter>
  );
};

export default App;
