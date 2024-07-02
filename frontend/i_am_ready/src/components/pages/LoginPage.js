import ButtonSub from "../ButtonSub";

export default function LoginPage() {
    return (
        <>
            <div className="login">
                <div className="sub_login">
                    <h1>iAmReady</h1>
                    <h2>Bridging Talent with Opportunities</h2>
                    <input type="email" placeholder="Email address"></input>
                    <input type="password" placeholder="Password"></input>
                    <div className="radio">
                        <label>
                            <input type="radio" name="gender" value="male"/>
                            Job Seeker
                        </label>

                        <label>
                            <input type="radio" name="gender" value="female"/>
                            Recruiter
                        </label>
                    </div>
                    <ButtonSub text={"Sign in"} color={"#2563eb"} />
                </div>
                
            </div>
        </>
    );
} 