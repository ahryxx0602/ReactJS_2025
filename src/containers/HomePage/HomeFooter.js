import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';




class HomeFooter extends Component {

    render() {

        return (
            <div className='home-footer'>
                <p>&copy; 2025 Ahryxx. More information, please contact me with my information.</p>
                <p><i className="far fa-envelope"></i> My email: phvanthanh06@gmail.com</p>
                <p><i className="fab fa-instagram"></i> My instagram: <a target='_blank' href='https://www.instagram.com/ahryxx._/'>ahryxx._</a></p>
                <p><i className="fab fa-facebook"></i> My facebook: <a target='_blank' href='https://www.facebook.com/vanthanh.phan.75286/'>Phan Văn Thành</a></p>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);