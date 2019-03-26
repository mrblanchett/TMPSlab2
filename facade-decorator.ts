interface Topping {
    getName(): string;
    setName(name): void;
    apply(): void;
}

class BasicTopping implements Topping {
    private ToppingName: string;
    
    public getName(): string {
        return this.ToppingName;
    }

    public setName(name): void {
        this.ToppingName = name;
    }

    public apply(): void {
        console.log("Added topping: ", this.ToppingName);
    }
}

class Pizza {
    public MakeCrust(): void {
        console.log("Kneading the dough...");
    }
    public MakeToppings(order): void {
        let n = order.length;
        let topping = new BasicTopping;
        for (let i = 0; i<n; i++) {
            topping.setName(order[i]);
            topping.apply();
        }
    }
    public AddSauce(): void {
        console.log("Spreading sauce thin and nice...")
    }
    public BakePizza(): void {
        console.log("Baking the pizza...")
    }
}

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

function Client1() {
    const table1 = new Order;
    table1.PlaceOrder('olives, ham, blue cheese');
    table1.OrderTo('takeaway');
    console.log('Pizza 1:');
    table1.DeliveryService();

    const call1 = new Order;
    call1.PlaceOrder('pineapple, salami, cheddar');
    call1.OrderTo('green street 44');
    console.log('Pizza 2:');
    call1.DeliveryService();

    const call2 = new Order;
    call2.PlaceOrder('pineapple, salami, cheddar');
    call2.OrderTo('here');
    console.log('Pizza 3:');
    call2.DeliveryService();
}

Client1();