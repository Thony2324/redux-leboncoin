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
    price: "",
    pictures: ""
  };

  handleFileChange = e => {
    this.setState({
      [e.target.name]: e.target.files[0]
    });
  };

  handleSubmit = async values => {
    // nécessaire d'utiliser async/await afin que le post soit fini avant de faire l'update

    // console.log("ad", {
    //   title: values.title,
    //   description: values.description,
    //   price: parseInt(values.price, 10)
    // });

    const formData = new FormData();
    // for (let name in this.state) {
    //   formData.append(name, this.state[name]);
    // }
    for (let i = 0; i < this.state.pictures.length; i++) {
      // on ajoute chaque fichier isolé dans le state, au FormData
      formData.append(`picture${i}`, this.state.pictures[i]);
    }
    //console.log("File0 = ", formData.get("pictures"));

    await axios.post(
      "https://leboncoin-api.herokuapp.com/api/offer/lbc-academy/upload",
      {
        data: formData
      },
      {
        headers: {
          Authorization: `Bearer ${this.props.user.token}`,
          "Content-Type": "multipart/form-data"
        }
      }
    );

    await axios
      .post(
        "https://leboncoin-api.herokuapp.com/api/offer/lbc-academy/publish",
        {
          title: values.title,
          description: values.description,
          price: parseInt(values.price, 10)
        },
        {
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
                  <input name="image" type="file" onChange={this.handleFileChange} />
                  {/* <input
                    type="file"
                    name="picture"
                    className="xuk-input xuk-form-width-large"
                    placeholder="Image"
                    value={this.state.file}
                    onChange={this.handleChangeFile}
                  /> */}
                  {/* <div data-uk-form-custom="target: true">
                    <input type="file" />
                    <input
                      className="uk-input uk-form-width-medium"
                      type="text"
                      name="files"
                      placeholder="Select file"
                    />
                  </div>
                  <button className="uk-button uk-button-default" onClick={values => this.handleUploadImage(values)}>
                    Upload
                  </button> */}
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
