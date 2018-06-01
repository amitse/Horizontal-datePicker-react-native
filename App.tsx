/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * 
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 */

import * as React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { DatePicker } from './datePicker'

interface Props { }
export default class App extends React.Component<Props> {
  render() {
    return (<View>
      <DatePicker />
    </View>
    );
  }
}
