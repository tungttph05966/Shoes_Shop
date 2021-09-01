import React, { Component } from 'react'

export default class BlogDetail extends Component {
    render() {
        return (
            <div className="blog-details-main">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="location">
                                <ul>
                                    <li><a href="/" title="go to homepage">Home<span>/</span></a></li>
                                    <li><strong> blog details</strong></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-3">
                            <div className="product-sidebar">
                                <div className="sidebar-title">
                                    <h2>Shopping Options</h2>
                                </div>
                                <div className="single-sidebar">
                                    <div className="single-sidebar-title">
                                        <h3>Category</h3>
                                    </div>
                                    <div className="single-sidebar-content">
                                        <ul>
                                            <li><a href="#">Dresses (4)</a></li>
                                            <li><a href="#">shoes (6)</a></li>
                                            <li><a href="#">Handbags (1)</a></li>
                                            <li><a href="#">Clothing (3)</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="single-sidebar">
                                    <div className="single-sidebar-title">
                                        <h3>Color</h3>
                                    </div>
                                    <div className="single-sidebar-content">
                                        <ul>
                                            <li><a href="#">Black (2)</a></li>
                                            <li><a href="#">Blue (2)</a></li>
                                            <li><a href="#">Green (4)</a></li>
                                            <li><a href="#">Grey (2)</a></li>
                                            <li><a href="#">Red (2)</a></li>
                                            <li><a href="#">White (2)</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="single-sidebar">
                                    <div className="single-sidebar-title">
                                        <h3>Manufacturer</h3>
                                    </div>
                                    <div className="single-sidebar-content">
                                        <ul>
                                            <li><a href="#">Calvin Klein (2)</a></li>
                                            <li><a href="#">Diesel (2)</a></li>
                                            <li><a href="#">option value (1)</a></li>
                                            <li><a href="#">Polo (2)</a></li>
                                            <li><a href="#">store view (4)</a></li>
                                            <li><a href="#">Tommy Hilfiger (2)</a></li>
                                            <li><a href="#">will be used (1)</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="banner-left">
                                    <a href="#">
                                        <img src="/img/product/banner_left.jpg" alt />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-9">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="sidebar-title">
                                        <h2>Details Post</h2>
                                    </div>
                                    <div className="blog-area">
                                        <div className="blog-post-details">
                                            <div className="blog-img">
                                                <a href="#">
                                                    <img src="/img/blog/5.jpg" alt />
                                                </a>
                                            </div>
                                            <div className="blog-content">
                                                <a href="#" className="blog-title">Lorem ipsum dolor sit amet</a>
                                                <span><a href="#">By plaza themes - </a>17 Aug 2015 ( 0 comments )</span>
                                                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna onec vitae hendrerit arcu, sit amet faucibus nisl. Cras pretium arcu ex.</p>
                                                <p>Aliquam et metus pharetra, bibendum massa nec, fermentum odio. Nunc id leo ultrices, mollis ligula in, finibus tortor. Mauris eu dui ut lectus fermentum eleifend. Pellentesque faucibus sem ante, non malesuada odio varius nec. Suspendisse potenti. Proin consectetur aliquam odio nec fringilla. Sed interdum at justo in efficitur. Vivamus gravida volutpat sodales. Fusce ornare sit amet ligula condimentum sagittis.</p>
                                                <blockquote>Quisque semper nunc vitae erat pellentesque, ac placerat arcu consectetur. In venenatis elit ac ultrices convallis. Duis est nisi, tincidunt ac urna sed, cursus blandit lectus. In ullamcorper sit amet ligula ut eleifend. Proin dictum tempor ligula, ac feugiat metus. Sed finibus tortor eu scelerisque scelerisque.</blockquote>
                                                <p>Aenean et tempor eros, vitae sollicitudin velit. Etiam varius enim nec quam tempor, sed efficitur ex ultrices. Phasellus pretium est vel dui vestibulum condimentum. Aenean nec suscipit nibh. Phasellus nec lacus id arcu facilisis elementum. Curabitur lobortis, elit ut elementum congue, erat ex bibendum odio, nec iaculis lacus sem non lorem. Duis suscipit metus ante, sed convallis quam posuere quis. Ut tincidunt eleifend odio, ac fringilla mi vehicula nec. Nunc vitae lacus eget lectus imperdiet tempus sed in dui. Nam molestie magna at risus consectetur, placerat suscipit justo dignissim. Sed vitae fringilla enim, nec ullamcorper arcu.</p>
                                                <p>Suspendisse turpis ipsum, tempus in nulla eu, posuere pharetra nibh. In dignissim vitae lorem non mollis. Praesent pretium tellus in tortor viverra condimentum. Nullam dignissim facilisis nisl, accumsan placerat justo ultricies vel. Vivamus finibus mi a neque pretium, ut convallis dui lacinia. Morbi a rutrum velit. Curabitur sagittis quam quis consectetur mattis. Aenean sit amet quam vel turpis interdum sagittis et eget neque. Nunc ante quam, luctus et neque a, interdum iaculis metus. Aliquam vel ante mattis, placerat orci id, vehicula quam. Suspendisse quis eros cursus, viverra urna sed, commodo mauris. Cras diam arcu, fringilla a sem condimentum, viverra facilisis nunc. Curabitur vitae orci id nulla maximus maximus. Nunc pulvinar sollicitudin molestie.</p>
                                                <div className="share-post">
                                                    <div className="share-title">
                                                        <h3>share this post</h3>
                                                    </div>
                                                    <div className="share-social">
                                                        <ul>
                                                            <li><a href="#"> <i className="fa fa-facebook" /> </a></li>
                                                            <li><a href="#"> <i className="fa fa-twitter" /> </a></li>
                                                            <li><a href="#"> <i className="fa fa-pinterest" /> </a></li>
                                                            <li><a href="#"> <i className="fa fa-google-plus" /> </a></li>
                                                            <li><a href="#"> <i className="fa fa-linkedin" /> </a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="about-author">
                                                    <div className="author-img">
                                                        <img src="/img/blog/admin.jpg" alt />
                                                    </div>
                                                    <div className="author-content">
                                                        <h3>About the Author: <a href="#">admin</a> </h3>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-10">
                                                        <div className="comment-box">
                                                            <div className="comment-title">
                                                                <h3>4 comments</h3>
                                                            </div>
                                                            <div className="comment-list">
                                                                <ul>
                                                                    <li>
                                                                        <div className="author-img">
                                                                            <img src="/img/blog/user.jpg" alt />
                                                                        </div>
                                                                        <div className="author-comment">
                                                                            <h5><a href="#">admin</a> Post author February 6, 2016 at 1:38 am <a href="#">Reply</a></h5>
                                                                            <p>just a nice post</p>
                                                                        </div>
                                                                    </li>
                                                                    <li className="comment-reply">
                                                                        <div className="author-img">
                                                                            <img src="/img/blog/admin.jpg" alt />
                                                                        </div>
                                                                        <div className="author-comment">
                                                                            <h5><a href="#">demo</a> Post author February 6, 2016 at 2:38 am <a href="#">Reply</a></h5>
                                                                            <p>Quisque semper nunc vitae erat pellentesque, ac placerat arcu consectetur</p>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="author-img">
                                                                            <img src="/img/blog/user.jpg" alt />
                                                                        </div>
                                                                        <div className="author-comment">
                                                                            <h5><a href="#">admin</a> Post author February 6, 2016 at 1:38 am <a href="#">Reply</a></h5>
                                                                            <p>just a nice post</p>
                                                                        </div>
                                                                    </li>
                                                                    <li className="comment-reply">
                                                                        <div className="author-img">
                                                                            <img src="/img/blog/admin.jpg" alt />
                                                                        </div>
                                                                        <div className="author-comment">
                                                                            <h5><a href="#">demo</a> Post author February 6, 2016 at 2:38 am <a href="#">Reply</a></h5>
                                                                            <p>Quisque semper nunc vitae erat pellentesque, ac placerat arcu consectetur</p>
                                                                        </div>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div className="leave-reply">
                                                            <div className="reply-title">
                                                                <h3>leave a reply</h3>
                                                            </div>
                                                            <div className="reply-form">
                                                                <p>Your email address will not be published. Required fields are marked *</p>
                                                                <form action="#">
                                                                    <div className="row">
                                                                        <div className="col-md-4">
                                                                            <label> Name * </label>
                                                                            <input type="text" />
                                                                        </div>
                                                                        <div className="col-md-4">
                                                                            <label> Email * </label>
                                                                            <input type="email" />
                                                                        </div>
                                                                        <div className="col-md-4">
                                                                            <label> Website </label>
                                                                            <input type="text" />
                                                                        </div>
                                                                        <div className="col-md-12 text-area">
                                                                            <label> comment </label>
                                                                            <textarea cols={30} rows={10} defaultValue={""} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="row">
                                                                        <div className="col-md-12">
                                                                            <div className="post-comment">
                                                                                <button type="submit"> post a comment </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="toolbar-bottom">
                                        <ul>
                                            <li><span>Pages:</span></li>
                                            <li className="current"><a href="#">1</a></li>
                                            <li><a href="#">2</a></li>
                                            <li><a href="#">3</a></li>
                                            <li><a href="#"> <img src="/img/product/pager_arrow_right.gif" alt /> </a></li>
                                        </ul>
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
