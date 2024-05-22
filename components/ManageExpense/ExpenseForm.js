import { Alert, StyleSheet, Text, View } from 'react-native';
import Input from './Input';
import { useState } from 'react';
import Button from '../UI/Button';
import { getFormattedDate } from '../../util/date';
import { GlobalStyles } from '../../constants/styles';

const ExpenseForm = ({ onCancel, onSubmit, submitButtonLabel, defaultValues }) => {
  const [inputs, setInputs] = useState({
    amount: { value: defaultValues ? defaultValues.amount.toString() : '', isValid: true },
    date: { value: defaultValues ? getFormattedDate(defaultValues.date) : '', isValid: true },
    description: { value: defaultValues ? defaultValues.description : '', isValid: true },
  });

  const inputChangeHandler = (inputIdentifier, enteredValue) => {
    setInputs((currentInputs) => {
      return {
        ...currentInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  };

  const submitFormHandler = () => {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };
    //validate input
    const isAmountValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const isDateValid = new Date(expenseData.date).toString() !== 'Invalid Date';
    const isDescriptionValid = expenseData.description.trim().length > 0;

    if (!isAmountValid || !isDateValid || !isDescriptionValid) {
      // Alert.alert('Invalid input', 'Please Check input');
      setInputs((currtInputs) => {
        return {
          amount: { value: currtInputs.amount.value, isValid: isAmountValid },
          date: { value: currtInputs.date.value, isValid: isDateValid },
          description: { value: currtInputs.description.value, isValid: isDescriptionValid },
        };
      });
      return;
    }
    onSubmit(expenseData);
  };

  // helper to check if form is valid
  const formisInvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.formTitle}>Your Expenses</Text>
      <View style={styles.amountDateContainer}>
        <Input
          label="Amount"
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: inputChangeHandler.bind(this, 'amount'),
            placeholder: 'Enter expense amount',
            value: inputs.amount.value,
          }}
          style={styles.inputContainer}
        />
        <Input
          label="Date"
          invalid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            value: inputs.date.value,
            onChangeText: inputChangeHandler.bind(this, 'date'),
          }}
          style={styles.inputContainer}
        />
      </View>
      <Input
        label="Description"
        invalid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          autoCorrect: true,
          placeholder: 'Enter expense description',
          value: inputs.description.value,
          onChangeText: inputChangeHandler.bind(this, 'description'),
        }}
      />

      {formisInvalid && <Text style={styles.errorText}>Invalid inputs value, please check before submitting</Text>}

      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitFormHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 50,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
  },
  amountDateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  inputContainer: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  errorText: {
    color: GlobalStyles.colors.error500,
    fontSize: 15,
    textAlign: '',
  },
});
