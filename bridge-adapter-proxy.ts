interface Device {
    isOn(): boolean;
    turnOn(): void;
    turnOff(): void;
    getChannel(): number;
    setChannel(channel): void;
    printStatus(): void;
}

interface Remote {
    power(device): void;
    channelUp(device): void;
    channelDown(device): void;
}

class TV implements Device {
    private status: boolean = false;
    private channel: number = 1;

    public isOn(): boolean {
        return this.status;
    }

    public turnOn(): void {
        this.status = true;
    }

    public turnOff(): void {
        this.status = false;
    }

    public getChannel(): number {
        return this.channel;
    }

    public setChannel(newChannel): void {
        this.channel = newChannel;
    }

    public printStatus(): void {
        console.log("I'm a TV set");
        console.log("My status is: ", this.status);
        console.log("The channel I'm on is: ", this.channel);
    }
}

class Radio implements Device {
    private status: boolean = false;
    private channel: number = 1;

    public isOn(): boolean {
        return this.status;
    }

    public turnOn(): void {
        this.status = true;
    }

    public turnOff(): void {
        this.status = false;
    }

    public getChannel(): number {
        return this.channel;
    }

    public setChannel(newChannel): void {
        this.channel = newChannel;
    }

    public printStatus(): void {
        console.log("I'm a radio");
        console.log("My status is: ", this.status);
        console.log("The channel I'm on is: ", this.channel);
    }
}

class GenericRemote implements Remote {
    public power(device): void {
        status = device.isOn();
        if (status == 'true') device.turnOff()
        else device.turnOn(); 
    }

    public channelUp(device): void {
        let currentChannel = device.getChannel();
        currentChannel++;
        device.setChannel(currentChannel);
    }

    public channelDown(device): void {
        let currentChannel = device.getChannel();
        currentChannel--;
        device.setChannel(currentChannel);
    }
}

class FancyRemote extends GenericRemote {
    public pickChannel(device, channel) {
        device.setChannel(channel);
    }
}

class AlienRemote implements Remote {
    private message;

    public power(device): void {
        status = device.isOn();
        if (status == 'true') this.message = "sleep"
        else this.message = "awaken";
        console.log(this.message);
    }

    public channelUp(device): void {
        let currentChannel = device.getChannel();
        this.message = "forward";
        console.log(this.message);
    }

    public channelDown(device): void {
        let currentChannel = device.getChannel();
        this.message = "backward";
        console.log(this.message);
    }

    public speak(): string {
        return this.message;
    }
}

class EarthRemote extends AlienRemote {
    public translate(alien, device): void {
        let newChannel = device.getChannel();
        let message = alien.speak();
        switch(message) {
            case 'awaken':
                device.turnOn();
                break;
            case 'sleep':
                device.turnOff();
                break;
            case 'forward':
                newChannel++;
                device.setChannel(newChannel);
                break;
            case 'backward':
                newChannel--;
                device.setChannel(newChannel);
                break;
            default:
                console.log("We couldn't understand the alien");
        }
    }
    public translateProxy(messenger, device): void {
        let newChannel = device.getChannel();
        let message = messenger.SpeakOnBehalf();
        switch(message) {
            case 'awaken':
                device.turnOn();
                break;
            case 'sleep':
                device.turnOff();
                break;
            case 'forward':
                newChannel++;
                device.setChannel(newChannel);
                break;
            case 'backward':
                newChannel--;
                device.setChannel(newChannel);
                break;
            default:
                console.log("We couldn't understand the alien");
        }
    }
}

class AlienListener {
    private theMessage: string;
    public GetAlienMessage(alien): void {
        this.theMessage = alien.speak();
    }
    public SpeakOnBehalf(): string {
        return this.theMessage;
    }
}

function Client() {
    const myTV = new TV;
    const myRadio = new Radio;

    console.log("Testing basic remote");
    const myRemote = new GenericRemote;
    myRemote.power(myTV);
    myRemote.channelUp(myTV);
    myTV.printStatus();

    console.log("Testing fancy remote");
    const sickRemote = new FancyRemote;
    sickRemote.pickChannel(myTV, 7);
    myTV.printStatus();

    console.log("Testing alien remote");
    const peridot = new AlienRemote;
    peridot.channelUp(myTV);
    myTV.printStatus();

    console.log("See, nothing's changed. Let's try with an adapter");
    const pearl = new EarthRemote;
    pearl.translate(peridot, myTV);
    myTV.printStatus();
    console.log("Now we can understand out alien!");

    console.log("Let's try this mess with a proxy now");
    const lapis = new AlienListener;
    lapis.GetAlienMessage(peridot);
    pearl.translateProxy(lapis, myTV);
    myTV.printStatus();
}

Client();