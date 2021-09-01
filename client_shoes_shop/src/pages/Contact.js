import React, { Component } from 'react'

export default class Contact extends Component {
    render() {
        return (
            <div className="contact-area">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="location">
                                <ul>
                                    <li><a href="/" title="go to homepage">Home<span>/</span></a></li>
                                    <li><strong> Liên hệ</strong></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-8 col-sm-offset-2">
                            <div className="contact-info">
                                <div id="googleMap">
                                    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7448.184890120996!2d105.84021709870453!3d21.028986735502876!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab44b9e5c745%3A0x7897e27fbc98f284!2zSOG7kyBHxrDGoW0!5e0!3m2!1svi!2s!4v1625944216663!5m2!1svi!2s" width="100%" height="100%" style={{ height: '100%', border: 0, minHeight: 350 }} allowFullScreen="" loading="lazy"></iframe>
                                </div>
                                <div className="contact-details">
                                    <div className="contact-title">
                                        <h3>contact us</h3>
                                    </div>
                                    <div className="contact-form">
                                        <div className="form-title">
                                            <h4>contact information</h4>
                                        </div>
                                        <div className="form-content">
                                            <ul>
                                                <li>
                                                    <div className="form-box">
                                                        <div className="form-name">
                                                            <label>Name <em>*</em> </label>
                                                            <input type="text" />
                                                        </div>
                                                    </div>
                                                    <div className="form-box">
                                                        <div className="form-name">
                                                            <label>Email <em>*</em> </label>
                                                            <input type="email" />
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="form-box">
                                                        <div className="form-name">
                                                            <label>telephone </label>
                                                            <input type="text" />
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="form-box">
                                                        <div className="form-name">
                                                            <label>Comment <em>*</em> </label>
                                                            <textarea cols={5} rows={3} defaultValue={""} />
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="buttons-set">
                                        <p> <em>*</em> Required Fields</p>
                                        <button type="submit">submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
