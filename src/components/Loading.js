import React from 'react';

const Loading = () => {

    return (
        <div style={loadingStyle}>
            <style>{keyframes}</style>
            <div style={spinnerStyle}></div>
        </div>
    );
};

export default Loading

const loadingStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
}

const spinnerStyle = {
    border: '16px solid #f3f3f3',
    borderTop: '16px solid #3498db',
    borderRadius: '50%',
    width: '120px',
    height: '120px',
    animation: 'spin 2s linear infinite',
}

const keyframes = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`
