import Button from '@/components/Button';
import './ResetPass.css';
import { FaLock } from 'react-icons/fa';

function ResetPass() {
    return (
        <div className="Form-reset-password">
            <div className="form-box-reset-password">
                <form action="">
                    <h1>Reset Password</h1>
                    <div className="input-box-password-reset">
                        <input type="password" placeholder="new password" required />
                        <FaLock className="icon" />
                    </div>
                    <div className="input-box-password-reset">
                        <input type="password" placeholder="confirm password" required />
                        <FaLock className="icon" />
                    </div>
                    <div>
                        <button className="submit-reset" type="submit">
                             Reset PassWord
                        </button>
                    </div>
                    <div className="register-link">
                        <p>
                            Remembered your account?{' '}
                            <Button className="link-button-login" to={'/Login'}>
                                Login
                            </Button>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ResetPass;
