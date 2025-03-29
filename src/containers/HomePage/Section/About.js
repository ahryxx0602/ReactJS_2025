import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';




class About extends Component {

    render() {

        return (
            <div className='section-share section-about'>
                <div className='section-about-header'>
                    Truyền thông nói về chúng tôi.
                </div>
                <div className='section-about-content'>
                    <div className='content-left'>
                        <iframe width="100%" height="400px"
                            src="https://www.youtube.com/embed/QiLfmPkSwcE"
                            title="The Ancient Capital of Hue - edit"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen>
                        </iframe>
                    </div>
                    <div className='content-right'>
                        <p>I am seeking a work-student position in backend development to apply my programming skills and enhance my knowledge in building web applications. I am eager to collaborate, contribute to real projects, and expand my expertise in backend technologies.</p>
                        <p>Tôi đang tìm kiếm một vị trí thực tập sinh về “Backend Developer” để áp dụng các kỹ năng lập trình của mình và nâng cao kiến ​​thức của tôi trong việc xây dựng các ứng dụng web. Tôi mong muốn được cộng tác, đóng góp vào các dự án thực tế và mở rộng chuyên môn của mình trong lĩnh vực “Backend Developer”.</p>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);