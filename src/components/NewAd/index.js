import React from "react";
import MainLayout from "../MainLayout";
import { connect } from "react-redux";
import { selectCurrentUser } from "../../selectors";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const validSchema = Yup.object().shape({
  title: Yup.string().required("Title required !"),
  description: Yup.string().required("Description required !"),
  price: Yup.number().required("Price required !")
});

class NewAd extends React.Component {
  state = {
    title: "",
    description: "",
    price: ""
  };

  handleSubmit = async values => {
    // nécessaire d'utiliser async/await afin que le post soit fini avant de faire l'update
    //console.log("history : ", this.props.history);
    // console.log("token : ", this.props.user.token);
    console.log("ad", {
      title: values.title,
      description: values.description,
      price: parseInt(values.price, 10)
    });

    await axios
      .post(
        "https://leboncoin-api.herokuapp.com/api/offer/publish",
        {
          title: values.title,
          description: values.description,
          price: parseInt(values.price, 10)
        },
        {
          // le serveur veut que le token soit passé en header de type Bearer
          headers: {
            Authorization: `Bearer ${this.props.user.token}`
          }
        }
      )
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });

    // await fetch("https://leboncoin-api.herokuapp.com/api/offer/publish", {
    //   method: "POST",
    //   //mode: "no-cors",
    //   headers: {
    //     Authorization: `Bearer ${this.props.user.token}`,
    //     Accept: "application/json",
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({
    //     title: values.title,
    //     description: values.description,
    //     price: parseInt(values.price, 10)
    //   })
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log("data : ", data);
    //   });
    // redirect to home
    await this.props.history.push("/");
  };

  render() {
    return (
      <MainLayout history={this.props.history}>
        <React.Fragment>
          <h1>Déposer une annonce</h1>
          <Formik
            initialValues={this.state}
            validationSchema={validSchema}
            onSubmit={values => this.handleSubmit(values)}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="uk-margin">
                  <div className="uk-form-controls">
                    <Field name="title" type="text" placeholder="Title" className="uk-input uk-form-width-large" />
                  </div>
                  {errors.title && touched.title ? <div className="uk-text-danger">{errors.title}</div> : null}
                </div>
                <div className="uk-margin">
                  <div className="uk-form-controls">
                    <Field
                      name="description"
                      type="text"
                      placeholder="Description"
                      className="uk-input uk-form-width-large"
                    />
                  </div>
                  {errors.description && touched.description ? (
                    <div className="uk-text-danger">{errors.description}</div>
                  ) : null}
                </div>
                <div className="uk-margin">
                  <div className="uk-form-controls">
                    <Field name="price" type="text" placeholder="Price" className="uk-input uk-form-width-large" />
                  </div>
                  {errors.price && touched.price ? <div className="uk-text-danger">{errors.price}</div> : null}
                </div>
                <div className="uk-margin">
                  <button className="uk-button uk-button-primary" type="submit">
                    Valider
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </React.Fragment>
      </MainLayout>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: selectCurrentUser(state)
  };
};

export default connect(mapStateToProps, null)(NewAd);
