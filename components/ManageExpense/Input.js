import { StyleSheet, Text, TextInput, View } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

const Input = ({ label, style, textInputConfig, invalid }) => {
  let inputStyles = [styles.input];
  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.multilineInput);
  }
  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.label, invalid ? styles.errorLabel : '']}>{label}:</Text>
      <TextInput {...textInputConfig} style={[inputStyles, invalid ? styles.errorInput : '']} />
    </View>
  );
};

export default Input;
const styles = StyleSheet.create({
  container: {
    marginVertical: 6,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 6,
  },
  input: {
    padding: 6,
    backgroundColor: GlobalStyles.colors.primary100,
    borderRadius: 6,
    fontSize: 15,
    color: GlobalStyles.colors.primary500,
  },
  multilineInput: {
    textAlignVertical: 'top',
    minHeight: 100,
  },
  errorLabel: {
    color: GlobalStyles.colors.error500,
  },
  errorInput: {
    // borderColor: GlobalStyles.colors.error500,
    // borderWidth: 1,
    // borderRadius: 6,
    backgroundColor: GlobalStyles.colors.error50,
  },
});
