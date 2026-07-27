// React App for Android
const { useState, useEffect } = React;

function App() {
  const [count, setCount] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return React.createElement('div', { className: 'app' },
    // Status Bar
    React.createElement('div', { className: 'status-bar' },
      React.createElement('span', null, currentTime.toLocaleTimeString('ar-SA')),
      React.createElement('div', { className: 'dots' },
        React.createElement('div', { className: 'dot green' }),
        React.createElement('div', { className: 'dot yellow' }),
        React.createElement('div', { className: 'dot red' })
      )
    ),
    // Main Content
    React.createElement('div', { className: 'content' },
      React.createElement('div', { className: 'header' },
        React.createElement('div', { className: 'icon' }, '📱'),
        React.createElement('h1', null, 'تطبيقي'),
        React.createElement('p', null, 'تطبيق Android حقيقي')
      ),
      React.createElement('div', { className: 'card' },
        React.createElement('p', { className: 'label' }, 'عدد النقرات'),
        React.createElement('p', { className: 'count' }, count)
      ),
      React.createElement('button', { 
        className: 'btn-primary',
        onClick: () => setCount(c => c + 1)
      }, 'اضغط هنا'),
      React.createElement('button', { 
        className: 'btn-secondary',
        onClick: () => setCount(0)
      }, 'إعادة تعيين'),
      React.createElement('div', { className: 'info' },
        React.createElement('p', { className: 'info-title' }, 'معلومات التطبيق'),
        React.createElement('div', { className: 'info-row' },
          React.createElement('span', null, 'المنصة'),
          React.createElement('span', { className: 'value' }, 'Android')
        ),
        React.createElement('div', { className: 'info-row' },
          React.createElement('span', null, 'الإصدار'),
          React.createElement('span', { className: 'value' }, '1.0.0')
        )
      )
    ),
    // Bottom Navigation
    React.createElement('div', { className: 'bottom-nav' },
      React.createElement('button', { className: 'nav-item active' }, '🏠 الرئيسية'),
      React.createElement('button', { className: 'nav-item' }, 'ℹ️ حول'),
      React.createElement('button', { className: 'nav-item' }, '⚙️ الإعدادات')
    )
  );
}

// Render the app
ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));
