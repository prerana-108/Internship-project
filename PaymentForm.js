import React, { Component } from 'react';
import { injectStripe, CardNumberElement, CardCVCElement, CardExpiryElement } from 'react-stripe-elements';
import { Form, Segment } from 'semantic-ui-react';

class PaymentForm extends Component {

  state = {
    cardNumberComplete: false,
    cardExpiryComplete: false,
    cvcComplete: false
  }

  stripeElementChange = (element, name) => {
    this.setState({ [name]: element.complete });

    const { cardNumberComplete, cardExpiryComplete, cvcComplete } = this.state;

    if (cardNumberComplete && cardExpiryComplete && cvcComplete) {
      this.props.formStatus(true);
    } else {
      this.props.formStatus(false);
    }
  }

  render() {

    const createOptions = (fontSize, padding) => {
      return {
        style: {
          base: {
            fontSize,
            color: '#424770',
            letterSpacing: '0.025em',
            '::placeholder': {
              color: '#aab7c4',
            },
            padding,
          },
          invalid: {
            color: '#9e2146',
          },
        },
      };
    };

    return (
      <Segment>
        <Form>
          <Form.Field>
            <label>Card number</label>
            <CardNumberElement
              {...createOptions(this.props.fontSize)}
              options={{ creditCard: true }}
              onChange={(element) => this.stripeElementChange(element, 'cardNumberComplete')}
            />
          </Form.Field>
          <Form.Field>
            <label>Expiration date</label>
            <CardExpiryElement
              {...createOptions(this.props.fontSize)}
              onChange={(element) => this.stripeElementChange(element, 'cardExpiryComplete')}
            />
          </Form.Field>
          <Form.Field>
            <label>CVC</label>
            <CardCVCElement
              {...createOptions(this.props.fontSize)}
              onChange={(element) => this.stripeElementChange(element, 'cvcComplete')}
            />
          </Form.Field>
        </Form>
      </Segment>
    );
  }
}

export default injectStripe(PaymentForm);