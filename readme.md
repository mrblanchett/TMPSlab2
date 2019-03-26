# TMPS

## Lab №2
 - Bridge, Adapter and Proxy patterns are implemented in 'bridge-adapter-proxy.ts'
 - Facade and Decorator patterns are implemented in 'facade-decoratot.ts'

### Bridge Pattern
Bridge is a structural design pattern that lets you split a large class or a set of closely related classes into two separate hierarchies—abstraction and implementation—which can be developed independently of each other.

```
interface Remote {
    power(device): void;
    channelUp(device): void;
    channelDown(device): void;
}

interface Device {
    isOn(): boolean;
    turnOn(): void;
    turnOff(): void;
    getChannel(): number;
    setChannel(channel): void;
    printStatus(): void;
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
```

### Adapter Pattern
Adapter is a structural design pattern that allows objects with incompatible interfaces to collaborate.

```
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
}
```

### Proxy Pattern
Proxy is a structural design pattern that lets you provide a substitute or placeholder for another object. A proxy controls access to the original object, allowing you to perform something either before or after the request gets through to the original object.

```
class EarthRemote extends AlienRemote {
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
```

### Facade Pattern
Facade is a structural design pattern that provides a simplified interface to a library, a framework, or any other complex set of classes.

```
class Order {
    private OrderNumber: number;
    private ToppingList: string[];
    private OrderDestination: string;
    private MyDestination;

    public PlaceOrder(order): void {
        this.ToppingList = order.split(', ');
    }
    public OrderTo(order): void {
        this.OrderDestination = order;
    }
    public DeliveryService(): void {
        const MyPizza = new Pizza;
        MyPizza.MakeCrust();
        MyPizza.AddSauce();
        MyPizza.MakeToppings(this.ToppingList);
        MyPizza.BakePizza();
        switch(this.OrderDestination) {
            case 'here':
            this.MyDestination = new DeliverToRestaurant;
            this.MyDestination.DeliverPizza();
            break;
            case 'takeaway':
            this.MyDestination = new Takeaway;
            this.MyDestination.DeliverPizza();
            break;
            default: 
            this.MyDestination = new DeliverToAddress;
            this.MyDestination.address = this.OrderDestination;
            this.MyDestination.ThirtyMinutes();
        }
        
    }
}
    const table1 = new Order;
    table1.PlaceOrder('olives, ham, blue cheese');
    table1.OrderTo('takeaway');
    table1.DeliveryService();
```

### Decorator Pattern
Decorator is a structural design pattern that lets you attach new behaviors to objects by placing these objects inside special wrapper objects that contain the behaviors.

```
interface PizzaDeliverer {
    DeliverPizza(): void;
}

class DeliverToRestaurant implements PizzaDeliverer {
    public DeliverPizza(): void {
        console.log("Delivered to the table!");
    }
}

class Takeaway implements PizzaDeliverer {
    public DeliverPizza(): void {
        console.log("Wrapped and ready to deliver!");
    }
}

class DeliverToAddress extends Takeaway {
    private address: string;
    public ThirtyMinutes(): void {
        console.log("Delivery destination: ", this.address);
    }
}
```
