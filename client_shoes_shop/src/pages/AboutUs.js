import React, { Component } from 'react'

export default class Contact extends Component {
    render() {
        return (
            <div className="about-us">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="location">
                                <ul>
                                    <li><a href="/" title="go to homepage">Home<span>/</span></a>  </li>
                                    <li><strong> Về chúng tôi</strong></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="about-page">
                        <div className="row">
                            <div className="col-md-7 col-sm-7">
                                <div className="about-page-content">
                                    <h3>The standard lorem ipsum passage</h3>
                                    <p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?</p>
                                    <blockquote>
                                        <p>Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur</p>
                                    </blockquote>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eu nisi ac mi malesuada vestibulum. Phasellus tempor nunc eleifend cursus molestie. Mauris lectus arcu, pellentesque at sodales sit amet, condimentum id nunc. Donec ornare mattis suscipit. Praesent fermentum accumsan vulputate.</p>
                                </div>
                            </div>
                            <div className="col-md-5 col-sm-5">
                                <div className="about-img">
                                    <img src="/img/about/about.jpg" alt="" className="img-responsive" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
