import {StyleSheet} from 'React-Native';

const styles = StyleSheet.create({
  login: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: 'red',
  },
  textbox: {
    borderColor: 'blue',
    borderWidth: 1,
    padding: 8,
    margin: 10,
    width: 200,
    borderRadius: 15,
  },
  loginButton: {
    padding: 8,
    margin: 10,
  },
  regisButton: {
    paddingTop: 40,
    marginTop: 20,
    margin: 40,
  },
});

export default {styles};
