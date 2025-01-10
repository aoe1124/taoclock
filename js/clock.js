class Clock {
    constructor() {
        this.timeElement = document.getElementById('time');
        this.dateElement = document.getElementById('date');
        this.use12Hour = false;
        this.init();
    }

    init() {
        this.updateTime();
        setInterval(() => this.updateTime(), 1000);
    }

    updateTime() {
        const now = new Date();
        
        // 更新时间
        let hours = now.getHours();
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        
        // 12小时制处理
        if (this.use12Hour) {
            hours = hours % 12 || 12;
        }
        
        // 统一格式化显示，每个数字用span包裹
        hours = String(hours).padStart(2, '0');
        this.timeElement.innerHTML = `<span>${hours[0]}</span><span>${hours[1]}</span>:<span>${minutes[0]}</span><span>${minutes[1]}</span>:<span>${seconds[0]}</span><span>${seconds[1]}</span>`;
        
        // 更新日期
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        this.dateElement.textContent = now.toLocaleDateString('en-US', options);
    }
}

// 初始化时钟并保存实例
document.addEventListener('DOMContentLoaded', () => {
    window.clockInstance = new Clock();
}); 