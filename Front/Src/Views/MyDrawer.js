import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './Home';

const Drawer = createDrawerNavigator();

const MyDrawer = ({ navigation }) => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} />
    </Drawer.Navigator>
  );
}

export default MyDrawer;