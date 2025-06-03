class Terminal {
    constructor() {
        this.terminal = document.getElementById('terminal');
        this.typingText = this.terminal.querySelector('.typing-text');
        this.cursor = this.terminal.querySelector('.cursor');
        this.commands = [
            {
                text: 'git clone https://github.com/ashishlaheri/jarvis-Meta.git',
                delay: 50,
                type: 'command'
            },
            {
                text: 'cd jarvis-Meta',
                delay: 50,
                type: 'command'
            },
            {
                text: 'pip install -r requirements.txt',
                delay: 30,
                type: 'command'
            },
            {
                text: 'python main.py',
                delay: 50,
                type: 'command'
            },
            {
                text: 'Jarvis AI Assistant initialized...',
                delay: 30,
                type: 'output'
            },
            {
                text: 'Hello! I am Jarvis, your AI assistant.',
                delay: 30,
                type: 'output'
            },
            {
                text: 'How can I help you today?',
                delay: 30,
                type: 'output'
            }
        ];
        this.currentCommandIndex = 0;
        this.isTyping = false;
        
        this.init();
    }

    init() {
        // Add event listeners
        this.terminal.addEventListener('click', () => this.terminal.focus());
        this.terminal.addEventListener('keydown', (e) => this.handleKeyPress(e));
        
        // Start typing animation
        this.typeNextCommand();
    }

    async typeNextCommand() {
        if (this.currentCommandIndex >= this.commands.length) {
            this.currentCommandIndex = 0;
        }

        const command = this.commands[this.currentCommandIndex];
        this.isTyping = true;

        // Create new line
        const line = document.createElement('div');
        line.className = `terminal-line ${command.type}`;
        this.typingText.appendChild(line);

        // Type the command
        for (let i = 0; i < command.text.length; i++) {
            if (!this.isTyping) break;
            line.textContent += command.text[i];
            await this.sleep(command.delay);
        }

        this.isTyping = false;
        this.currentCommandIndex++;

        // Add cursor blink effect
        this.cursor.style.display = 'inline-block';
        this.cursor.classList.add('blink');

        // Wait before next command
        await this.sleep(1000);
        this.typeNextCommand();
    }

    handleKeyPress(e) {
        if (e.key === 'Enter' && !this.isTyping) {
            this.isTyping = false;
            this.typeNextCommand();
        }
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize terminal when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Terminal();
}); 