export default {
  en: {
    notifications: {
      orderStatusDidChange: {
        button: 'Go to orders',
        dismiss: 'Dismiss'
      },
      orderCreateNewOne: {
        button: 'Make a new order',
        dismiss: 'Dismiss'
      }
    },
    api: {
      offline: 'Looks like you are offline!'
    },
    categories: {
      title: 'Menu',
      noCategories: 'Sorry, no products available.',
      welcomeBar: {
        heading: 'Welcome to'
      }
    },
    basket: {
      title: 'Basket',
      items: `{quantity, plural,
        =0 {No items}
        one {1 item}
        other {{quantity} items}
      }`,
      submitOrder: 'Place order',
      delivery: 'Delivery',
      summary: 'Order summary',
      summaryBox: {
        subTotal: 'Subtotal',
        processingFee: 'Processing fee',
        total: 'Total'
      },
      location: 'Location'
    },
    basketBar: {
      title: 'Basket',
      items: `{quantity, plural,
        =0 {No items}
        one {1 item}
        other {{quantity} items}
      }`
    },
    app: {
      currency: '£',
      shortcuts: {
        orders: {
          type: 'Orders',
          title: 'My orders',
          subtitle: 'See order details'
        },
        venues: {
          type: 'Venues',
          subtitle: 'Find nearby venues'
        }
      }
    },
    auth: {
      loginForm: {
        email: 'Email',
        password: 'Password'
      },
      registerForm: {
        firstName: 'First name',
        lastName: 'Last name',
        password: 'Password',
        email: 'Email'
      },
      resetPasswordForm: {
        email: 'Email address'
      },
      paymentForm: {
        cardName: 'Card nickname (optional)',
        tip: 'By giving your card a name you can easily choose from multiple ones later',
        cardNumber: 'Card number',
        expiryDate: 'Expiry date (MM/YY)',
        ccv: 'CCV'
      },
      newPasswordForm: {
        password: 'Password',
        checkPassword: 'Confirm password'
      }
    },
    location: {
      title: 'One last thing',
      message: 'Please allow us access to your location.\n\nWe use your location to know '
      + 'which venue you are in and who to order with as well as which table to deliver your order to.',
      button: {
        allow: 'Allow location access'
      }
    },
    locationError: {
      title: 'Oops!',
      message: 'It doesn’t look like you have given us permission to access your location. '
      + 'We need this so we know which venue you are in and who to order with.'
      + '\n\nPlease go to your settings and enable location using the link below.'
      + '\n\nIf you are sure permissions are correct, check if location services are enabled',
      button: {
        allow: 'Go to settings'
      }
    },
    menu: {
      categories: 'MENU',
      orders: 'ORDERS',
      venues: 'VENUES',
      profile: 'PROFILE',
      help: 'HELP',
      events: 'EVENTS'
    },
    events: {
      title: 'Events',
      noEvents: 'Sorry, no events available'
    },
    legal: {
      title: 'Legal',
      terms: [
        {
          title: 'Terms & Conditions',
          url: 'http://cdn.pushforchampagne.com/terms/f1.html?t=6'
        },
        {
          title: 'Privacy policy',
          url: 'http://cdn.pushforchampagne.com/terms/f2.html?t=1'
        },
        {
          title: 'Acceptable Use',
          url: 'http://cdn.pushforchampagne.com/terms/f3.html?t=1'
        }
      ]
    },
    contact: {
      title: 'Contact us',
      orderProblemTitle: 'Report problem',
      note: 'Drop us the message in the box below and we will contact you as soon as we can',
      form: {
        messageTitle: 'Title',
        messageBody: 'Message'
      },
      successTitle: 'Success',
      successDescription: 'Thank you for your message.',
      button: {
        send: 'Send message',
        ok: 'OK',
        sendAnotherOne: 'Send another'
      }
    },
    order: {
      summary: {
        processingFee: 'Processing fee',
        total: 'Total',
        glasses: 'Number of glasses'
      }
    },
    orderDetails: {
      title: 'Order details',
      header: 'Order #{orderId}',
      cardNumber: '{brand} XXXX-XXXX-XXXX-{last4}',
      password: 'Password',
      status: {
        new: 'New',
        processing: 'Accepted',
        rejected: 'Rejected',
        canceled: 'Canceled',
        finished: 'Finished'
      },
      inProgress: 'In progress',
      processingFee: 'Processing fee',
      total: 'Total',
      items: `{quantity, plural,
        =0 {No items}
        one {One item}
        other {{quantity} items}
      }`,
      button: {
        reportProblem: 'Report problem with this order'
      }
    },
    orderProblem: {
      title: 'Order issue',
      subTitle: 'Excuse us',
      intro: 'Sorry you are unhappy with your order. Please describe the issue and we’ll get it sorted.',
      options: {
        deliveryProblem: 'Order didn’t arrive',
        technicalIssue: 'Technical issue',
        somethingElse: 'Something else'
      }
    },
    orderDeliveryIssue: {
      title: 'Order issue',
      subTitle: 'We\'re sorry',
      intro: 'Sorry your order didn\'t arrive.\n\nTap the button below and we will alert the venue so they can sort it out for you.',
      actionButton: 'Alert venue',
      modal: {
        successTitle: 'Message sent',
        successDescription: 'Thanks. The venue has been alerted and will be in touch shortly.',
        button: {
          ok: 'Done'
        },
        errorTitle: 'There was an error'
      }
    },
    orders: {
      title: 'Orders',
      noOrders: 'No orders yet',
      list: {
        sectionName: '{sectionName} orders',
        row: {
          inProgress: 'In progress'
        }
      }
    },
    profile: {
      title: 'Profile',
      button: {
        save: 'Save',
        logout: 'Logout',
        addNewCard: 'Add new card'
      },
      permissions: 'Permissions',
      settings: 'Settings',
      successTitle: 'Success',
      successDescription: 'Your profile has been updated',
      defaultCardAlert: {
        errorTitle: 'Oops'
      },
      form: {
        email: '           Email',
        firstName: 'First name',
        lastName: ' Last name',
        dob: ' Birth date',
        personal: 'personal',
        payment: 'payment'
      },
      cardList: {
        sectionName: 'Payment',
        row: {
          cardNumber: '•••• •••• •••• {last4}'
        }
      },
      logoutConfirmation: {
        message: 'Are you sure you want to log out?',
        title: 'Log out',
        cancel: 'Cancel'
      },
      cardSheet: {
        title: 'What would you like to do with this card?',
        deleteCard: 'Delete this card',
        cancel: 'Cancel',
        makeDefault: 'Make this card default'
      }
    },
    help: {
      title: 'Help',
      noItems: 'Nothing to show'
    },
    helpItem: {
      button: {
        contact: 'Chat to us'
      }
    },
    venues: {
      title: 'Venues',
      noVenues: 'Sorry, no venues available'
    },
    chooseVenue: {
      title: 'Not yet!',
      subTitle: 'You can\'t order until you are inside.',
      viewVenues: 'See nearby venues',
      selectAutomatically: 'I\'m inside'
    },
    welcome: {
      title: 'PUSH',
      button: {
        login: 'Login',
        signUp: 'Sign up'
      }
    },
    login: {
      welcome: 'Welcome back',
      button: {
        signIn: 'Login',
        facebookLogin: 'Log in with Facebook'
      },
      alternativeWay: 'or login with password',
      forgotPassword: 'Forgot your password?'
    },
    enterPayment: {
      addPayment: 'Add payment',
      alternativeWay: 'or enter details',
      button: {
        continue: 'Continue',
        scanYourCard: 'Scan your card',
        logout: 'Logout'
      }
    },
    orderProcessError: {
      general: {
        title: '#omg',
        description: 'We were unable to finish your order.',
        note: 'But we can help you!',
        button: 'Visit help center'
      },
      cardDeclined: {
        title: 'Oops...',
        description: 'Your card was declined.',
        note: 'Don\'t worry, we won\'t tell anyone...',
        button: 'Update payment info'
      },
      expiredCard: {
        title: '#wat',
        description: 'You card has expired',
        note: 'Time to get a new one...',
        button: 'Update payment info'
      },
      button: {
        close: 'Back'
      }
    },
    orderProcess: {
      cancelError: {
        title: 'Error',
        message: 'Please contact venue for details'
      },
      cancelPopup: {
        cancel: 'Go back',
        accept: 'Cancel this order',
        title: 'Cancelling will refund the charged amount to your account immediatelly'
      },
      button: {
        close: 'Hide',
        cancel: 'Cancel'
      },
      new: {
        title: 'Thanks {firstName}',
        description: 'We\'ve received your order',
        password: 'This is your order password:',
        notifications: 'We use notifications to keep you updated about your orders. Nothing annoying!',
        button: {
          share: 'Share with friends',
          notifications: 'Keep me updated',
          decline: 'No thanks'
        }
      },
      processing: {
        title: 'Preparing now',
        description: 'Your order will be on it\'s way shortly',
        password: 'This is your order password:',
        notifications: 'Would you like us to notify you about status updates next time you order?',
        button: {
          share: 'Share with friends',
          notifications: 'Keep me updated',
          decline: 'No thanks'
        }
      },
      finished: {
        title: 'Order delivered',
        description: 'Enjoy your order, {firstName}',
        summary: 'Full details of this order can be found in the order history.',
        button: {
          share: 'Share with friends'
        }
      },
      rejected: {
        title: 'We\'re sorry',
        description: 'Your order was declined by the venue. The full value has been refunded',
        button: {
          close: 'Close'
        }
      },
      cancelled: {
        title: 'Order cancelled',
        description: 'Your order was cancelled. The full value has been refunded',
        button: {
          close: 'Close'
        }
      },
      newCollection: {
        title: 'Thanks {firstName}',
        description: 'We\'ve received your order',
        password: 'This is your order password:',
        notifications: 'We use notifications to keep you updated about your orders. Nothing annoying!',
        button: {
          share: 'Share with friends',
          notifications: 'Keep me updated',
          decline: 'No thanks'
        }
      },
      processingCollection: {
        title: 'Preparing now',
        description: 'Your order will be ready shortly',
        password: 'This is your order password:',
        notifications: 'Would you like us to notify you about status updates next time you order?',
        button: {
          share: 'Share with friends',
          notifications: 'Keep me updated',
          decline: 'No thanks'
        }
      },
      finishedCollection: {
        title: 'Order Ready',
        description: 'Please collect your order from the collection point with your order password below.',
        password: 'This is your order password:',
        summary: 'Full details of this order can be found in the order history.',
        button: {
          share: 'Share with friends'
        }
      },
      rejectedCollection: {
        title: 'We\'re sorry',
        description: 'Your order was declined by the venue. The full value has been refunded',
        button: {
          close: 'Close'
        }
      },
      cancelledCollection: {
        title: 'Order cancelled',
        description: 'Your order was cancelled. The full value has been refunded',
        button: {
          close: 'Close'
        }
      },
      shareView: {
        title: 'Just ordered from {venue} with PUSH! @getpushHQ'
      }
    },
    scanYourCard: {
      title: 'Scan your card',
      instructions: 'Hold your card steady in the green box'
    },
    register: {
      preTitle: 'Nice to meet you',
      title: 'Welcome!',
      button: {
        signUp: 'Sign up',
        facebookLogin: 'Log in with Facebook'
      },
      alternativeWay: 'or signup below',
      terms: 'By signing up you agree to ',
      termsLink: 'Terms and conditions'
    },
    newPassword: {
      title: 'New password',
      text: 'Enter a new password for your account',
      button: {
        save: 'save'
      }
    },
    resetPassword: {
      title: 'Reset password',
      text: 'Enter your email address below and we will send you a link to reset your password.',
      button: {
        submit: 'submit'
      },
      successTitle: 'Success!',
      successDescription: 'Reset password link sent to your inbox.'
    },
    venueDetails: {
      takeToVenue: 'Take me there',
      callVenue: 'Call venue',
      chooseVenue: 'I\'m here'
    }
  }
};
