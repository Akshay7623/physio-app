const PORT = 3000;
const HOSTNAME = 'http://localhost:' + PORT;
// const HOSTNAME = '';

{/* User api endpoints */ }

const REGISTER_URL = HOSTNAME + '/api/register';
const LOGIN_URL = HOSTNAME + '/api/login';
const AUTH_USER_URL = HOSTNAME + '/api/auth_user';
const GET_PROFILE_URL = HOSTNAME + '/api/get_profile';
const SUBMIT_REVIEW = HOSTNAME + '/api/submit_review';
const ADD_ADDRESS = HOSTNAME + '/api/add_address';
const UPDATE_ADDRESS = HOSTNAME + '/api/edit_address';
const CONTACT_US = HOSTNAME + '/api/contact_us';
const UPDATE_PROFILE = HOSTNAME + '/api/update_profile';
const BOOK_APPOINTMENT = HOSTNAME + '/api/book_appointment';
const GET_SAVED_ADDRESS = HOSTNAME + '/api/get_saved_addresses';
const DELETE_ADDRESS = HOSTNAME + '/api/delete_address';
const GET_SINGLE_ADDRESS = HOSTNAME + '/api/get_single_address';
const GET_APPOINTMENT_HISTORY = HOSTNAME + '/api/get_appointment_history';
const CHANGE_PASSWORD = HOSTNAME + '/api/change_password';
const GOOGLE_REQUEST_URL = HOSTNAME + '/google/request';
const SEND_OTP = HOSTNAME + '/api/send_otp';
const SUBMIT_OTP = HOSTNAME + '/api/submit_otp';
const RESET_PASSWORD = HOSTNAME + '/api/reset_password';
const RESET_PASSWORD_OTP = HOSTNAME + '/api/reset_pass_otp';
const SEND_OTP_UPDATE_MOBILE = HOSTNAME + '/api/send_otp_update_mobile';
const SUBMIT_OTP_UPDATE_MOBILE = HOSTNAME + '/api/submit_otp_update_mobile';
const CHANGE_MAIL = HOSTNAME + '/api/change_email';


{/* admin api endpoint */ }

const AUTH_ADMIN_URL = HOSTNAME + '/api/admin/auth_admin';
const ADMIN_LOGIN = HOSTNAME + '/api/admin/login'
const GET_USERS = HOSTNAME + '/api/admin/get_users';
const GET_APPOINTMENTS = HOSTNAME + '/api/get_appointments'
const GET_ALL_PHYSIO = HOSTNAME + '/api/get_all_physio';
const ADD_PHYSIO = HOSTNAME +'/api/add_physio';
const DELETE_PHYSIO = HOSTNAME+'/api/delete_physio';
const UPDATE_PHYSIO = HOSTNAME+'/api/update_physio';
const ASSIGN_APPOINTMENT = HOSTNAME +'/api/assign_appointment';

export {
    GET_PROFILE_URL,
    SUBMIT_REVIEW,
    ADD_ADDRESS,
    UPDATE_ADDRESS,
    CONTACT_US,
    REGISTER_URL,
    LOGIN_URL,
    AUTH_USER_URL,
    SEND_OTP_UPDATE_MOBILE,
    UPDATE_PROFILE,
    BOOK_APPOINTMENT,
    GET_SAVED_ADDRESS,
    DELETE_ADDRESS,
    GET_SINGLE_ADDRESS,
    GET_APPOINTMENT_HISTORY,
    CHANGE_PASSWORD,
    GOOGLE_REQUEST_URL,
    AUTH_ADMIN_URL,
    ADMIN_LOGIN,
    SEND_OTP,
    SUBMIT_OTP,
    RESET_PASSWORD,
    RESET_PASSWORD_OTP,
    SUBMIT_OTP_UPDATE_MOBILE,
    CHANGE_MAIL,
    GET_USERS,
    GET_APPOINTMENTS,
    GET_ALL_PHYSIO,
    ADD_PHYSIO,
    DELETE_PHYSIO,
    UPDATE_PHYSIO,
    ASSIGN_APPOINTMENT
}