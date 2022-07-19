import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import NavbarComponent from "../../components/Navbar/NavbarComponent";
import { Container, Image, Tabs, Tab } from 'react-bootstrap';
import { useEffect, useState } from "react";
import axios from "axios";
import Remarks from "./Remarks/Remarks";

const ProfilePage = () => {
    const user = useSelector((state) => state.user.value);
    const params = useParams();
    const [owner, setOwner] = useState({});

    useEffect(() => {
        axios.post(process.env.REACT_APP_API_URL + "user/getUser", {
            googleId: params.ownerId,
        }).then((user) => {
            setOwner(user.data.user);
        }).catch((err) => {
            console.log(err);
        });
    }, [params.ownerId]);

    return (
        <>
            <NavbarComponent />
            <Container className={"d-flex"}>
                <Image roundedCircle src={owner.imageUrl} />
                <Container className="d-flex justify-content-center">
                    <h1>{owner.name}</h1>
                </Container>
            </Container>
            <Tabs defaultActiveKey="first">
                <Tab eventKey="first" title="Remarks">
                    <Remarks userId={user.googleId} ownerId={owner.googleId} />
                </Tab>
                <Tab eventKey="second" title="Memories">
                    Hii, I am 2nd tab content
                </Tab>
            </Tabs>
        </>
    );
}

export default ProfilePage;