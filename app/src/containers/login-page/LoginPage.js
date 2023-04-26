import { Button, Form, Input } from "antd";
import { useContext, useState } from "react";
import UserContext from "../../contexts/UserContext";
import "./login-page.css";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formInfos, setFormInfos] = useState({});
  const { verifyCredentials, createUser } = useContext(UserContext);

  const onConnexion = (infos) => {
    console.log("Success: ", infos.email, infos.password);
    verifyCredentials(infos.email, infos.password);
  };

  const onRegister = (infos) => {
    console.log("Success: ", infos);
    createUser(infos);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onValuesChange = (changedValues, allValues) => {
    console.log(formInfos);
    setFormInfos(allValues);
  };

  const toggleLoginRegister = (e) => {
    e.preventDefault();
    setIsLogin((prev) => !prev);
    console.log(isLogin);
  };

  return (
    <div className="login__container">
      <h1>{isLogin ? "Connexion" : "Inscription"}</h1>
      <Form
        className="login__form"
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinishFailed={onFinishFailed}
        onValuesChange={onValuesChange}
        autoComplete="off"
      >
        {!isLogin ? (
          <Form.Item
            label="Prénom"
            name="firstName"
            rules={[
              {
                required: true,
                message: "Please input your firstname!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        ) : (
          ""
        )}

        {!isLogin ? (
          <Form.Item
            label="Nom"
            name="lastName"
            rules={[
              {
                required: true,
                message: "Please input your lastname!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        ) : (
          ""
        )}

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
          }}
        >
          {!isLogin ? (
            <div className="create-account">
              Déjà un compte ?{" "}
              <Button
                type="link"
                className="create-account-btn"
                onClick={toggleLoginRegister}
              >
                Se connecter !
              </Button>
            </div>
          ) : (
            <div className="create-account">
              Pas encore de compte ?{" "}
              <Button
                type="link"
                className="create-account-btn"
                onClick={toggleLoginRegister}
              >
                Créez-en un !
              </Button>
            </div>
          )}
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          {!isLogin ? (
            <Button type="primary" onClick={() => onRegister(formInfos)}>
              Création du compte
            </Button>
          ) : (
            <Button type="primary" onClick={() => onConnexion(formInfos)}>
              Connexion
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};
export default LoginPage;
