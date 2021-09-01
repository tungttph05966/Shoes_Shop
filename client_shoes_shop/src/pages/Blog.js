import React, { Component } from 'react'

export default class Blog extends Component {
    render() {
        return (
            <>
                <div>
                    <div className="blog-banner">
                        <img src="/img/product/banner.jpg" alt />
                    </div>
                    {/* blog banner end */}
                    {/* blog area start */}
                    <div className="blog-main">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="location">
                                        <ul>
                                            <li><a href="/" title="go to homepage">Home<span>/</span></a></li>
                                            <li><strong> blog</strong></li>
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
                                                <h2>Blog Posts</h2>
                                            </div>
                                            <div className="blog-area">
                                                <div className="single-blog-post-page">
                                                    <div className="blog-img">
                                                        <a href="/blog/abc">
                                                            <img src="/img/blog/5.jpg" alt />
                                                        </a>
                                                    </div>
                                                    <div className="blog-content">
                                                        <a href="/blog/abc" className="blog-title">Lorem ipsum dolor sit amet</a>
                                                        <span><a href="#">By plaza themes - </a>17 Aug 2015 ( 0 comments )</span>
                                                        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna...</p>
                                                        <a href="/blog/abc" className="readmore">read more &gt;</a>
                                                    </div>
                                                </div>
                                                <div className="single-blog-post-page">
                                                    <div className="blog-img">
                                                        <a href="/blog/abc">
                                                            <img src="/img/blog/6.jpg" alt />
                                                        </a>
                                                    </div>
                                                    <div className="blog-content">
                                                        <a href="/blog/abc" className="blog-title">Lorem ipsum dolor sit amet</a>
                                                        <span><a href="#">By plaza themes - </a>17 Aug 2015 ( 0 comments )</span>
                                                        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna...</p>
                                                        <a href="/blog/abc" className="readmore">read more &gt;</a>
                                                    </div>
                                                </div>
                                                <div className="single-blog-post-page">
                                                    <div className="blog-img">
                                                        <a href="/blog/abc">
                                                            <img src="/img/blog/5.jpg" alt />
                                                        </a>
                                                    </div>
                                                    <div className="blog-content">
                                                        <a href="/blog/abc" className="blog-title">Lorem ipsum dolor sit amet</a>
                                                        <span><a href="#">By plaza themes - </a>17 Aug 2015 ( 0 comments )</span>
                                                        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna...</p>
                                                        <a href="/blog/abc" className="readmore">read more &gt;</a>
                                                    </div>
                                                </div>
                                                <div className="single-blog-post-page">
                                                    <div className="blog-img">
                                                        <a href="/blog/abc">
                                                            <img src="/img/blog/6.jpg" alt />
                                                        </a>
                                                    </div>
                                                    <div className="blog-content">
                                                        <a href="/blog/abc" className="blog-title">Lorem ipsum dolor sit amet</a>
                                                        <span><a href="#">By plaza themes - </a>17 Aug 2015 ( 0 comments )</span>
                                                        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna...</p>
                                                        <a href="/blog/abc" className="readmore">read more &gt;</a>
                                                    </div>
                                                </div>
                                                <div className="single-blog-post-page">
                                                    <div className="blog-img">
                                                        <a href="/blog/abc">
                                                            <img src="/img/blog/5.jpg" alt />
                                                        </a>
                                                    </div>
                                                    <div className="blog-content">
                                                        <a href="/blog/abc" className="blog-title">Lorem ipsum dolor sit amet</a>
                                                        <span><a href="#">By plaza themes - </a>17 Aug 2015 ( 0 comments )</span>
                                                        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna...</p>
                                                        <a href="/blog/abc" className="readmore">read more &gt;</a>
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
                </div>

            </>
        )
    }
}
