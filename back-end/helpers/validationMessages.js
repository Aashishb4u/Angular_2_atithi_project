/**
 * Success and Failure messages.
 * @type {{USER_EXIST_ERROR: string, NAME_ERROR: string, EMAIL_ERROR: string, PASSWORD_MISMATCH_ERROR: string, PASSWORD_LENGTH_ERROR: string, EMPTY_FIELD_ERROR: string, INTERNAL_SERVER_ERROR: string, USER_NOT_FOUND_ERROR: string, WRONG_PASSWORD_ERROR: string, NOT_A_USER_ERROR: string, SESSION_EXPIRED_ERROR: string, PHONE_NO_ERROR: string, VISITOR_EXIST_ERROR: string, VISITOR_NOT_FOUND_ERROR: string, SERVER_ERROR: string, CLIENT_ERROR: string, SUCCESS: string, ADD_VISITOR_SUCCESS: string, UPDATE_VISITOR_SUCCESS: string, DELETE_VISITOR_SUCCESS: string, LOGIN_SUCCESS: string, REGISTRATION_SUCCESS: string}}
 */

module.exports = {
    // Failure error messages
    'USER_EXIST_ERROR': 'User already exist.',
    'NAME_ERROR': 'check the name you have entered.',
    'EMAIL_ERROR': 'check the email you have entered.',
    'PASSWORD_MISMATCH_ERROR': 'Password doesn\'t match, try again.',
    'PASSWORD_LENGTH_ERROR': 'Password must be of 8 characters.',
    'EMPTY_FIELD_ERROR': 'Please fill in the input fields.',
    'INTERNAL_SERVER_ERROR': 'Internal server error.',
    'USER_NOT_FOUND_ERROR': 'Authentication Failed, User not found.',
    'WRONG_PASSWORD_ERROR': 'Authentication failed, Wrong password.',
    'NOT_A_USER_ERROR': 'User not found.',
    'SESSION_EXPIRED_ERROR': 'Session expired login.',
    'PHONE_NO_ERROR': 'check mobile number you have entered.',
    'VISITOR_EXIST_ERROR': 'Visitor already exist.',
    'VISITOR_NOT_FOUND_ERROR': 'Visitor not found to update...',
    'SERVER_ERROR' : '500',
    'CLIENT_ERROR' : '400',
    'SUCCESS' : '200',

    // Success messages
    'ADD_VISITOR_SUCCESS': 'You have added new visitor successfully.',
    'UPDATE_VISITOR_SUCCESS': 'You have updated the visitor...',
    'DELETE_VISITOR_SUCCESS': 'You have deleted the visitor...',
    'LOGIN_SUCCESS': 'Login successful.',
    'REGISTRATION_SUCCESS': 'User registration successful.',
};
