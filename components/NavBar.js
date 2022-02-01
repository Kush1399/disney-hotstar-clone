import Link from "next/link"
import Image from "next/image"
import logo from "../public/disney.svg"

const NavBar = ({ account }) => {
    return (
        <div className="nav-div">
            <div><Link href="/"><Image src={logo} width={120} height={80}></Image></Link></div>

            <div className="account-info">
                <p>Welcome {account.username}</p>
                <img className="avatar" src={account.avatar.url} />
            </div>
        </div>
    )
}

export default NavBar

