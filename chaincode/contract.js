'use strict' ;

const {Contract} = require('fabric-contract-api');

class RegistrarContract extends Contract {

    constructor(){
        super('property-registration-network');
    }

    /**
     * Initiated by registrar to register new user to the network
     * @param ctx - The transaction context object
     * @param Name - Name of the user
     * @param AadharNumber - Aadhar number of the user
     * @Returns Request object
     **/
    
     async approveNewUser(ctx,
        name,
        aadhar)
    {
        // Create a composite key using Name and aadhar values
        const UserKey = ctx.stub.createCompositeKey('property-registration-network',[]string{name,aadhar});

        let UserBuffer = await ctx.stub.getState(UserKey).catch(err =>console.log(err));

        let requestobj = JSON.parse(UserBuffer.toString());

        let UserAsset = {
            Name : requestobj.Name,
            EmailId : requestobj.EmailId,
            PhoneNumber: requestobj.PhoneNumber,
            AadharNumber : requestobj.AadharNumber,
            CreatedAt : requestobj.Timenow,
            upgradCoins : 0
        }
        //Convert Json object to buffer
        let DataBuffer = Buffer.from(JSON.stringify(UserAsset));

        // Put it on blockchain for storage
        await ctx.stub.putState(UserKey, DataBuffer);
        return UserAsset;
    }
    /**
     * Initiated by user/registrar to view current state f user
     * @param ctx - The transaction context object
     * @param Name - Name of the user
     * @param AadharNumber - Aadhar number of the user
     **/
    
    async viewUser (ctx,
                name,
                aadhar)
    {
        // Get the user info using the composite key and Change it to json object
        const UserKey = ctx.stub.createCompositeKey('property-registration-network',[]string{name,aadhar});

        let UserBuffer = await ctx.stub.getState(UserKey).catch(err =>console.log(err));
        let userobj = JSON.parse(UserBuffer.toString());
        // Log the user object
        console.log(userobj);
    }

    /**
     * Initiated by registrar to create new propery asset of property on network
     * @param ctx - The transaction context object
     * @param PropertyID - Identity of the property
     * @returns - Property Asset
     **/
    
     async approvePropertyRegistration (ctx,
        propertyID)
    {
        // Create the composite key using property and fetch the buffer from chain
        const PropertyKey = ctx.stub.createCompositeKey('property-registration-network',[PropertyID]);
        let UserBuffer = await ctx.stub.getState(PropertyKey).catch(err =>console.log(err));

        let PropertyObj = JSON.parse(UserBuffer.toString());

        let ProperyAsset = {
            Property ID : PropertyObj.PropertyID,
            Owner: PropertyObj.Owner;
            Price : PropertyObj.Price,
            // Setting status to registered 
            Status : 'registered',
        }
        //Convert Json object to buffer
        let DataBuffer = Buffer.from(JSON.stringify(ProperyAsset));

        // Put it on blockchain for storage
        await ctx.stub.putState(PropertyKey, DataBuffer);

        return ProperyAsset;
    }
    /**
     * Initiated by registrar/user to view property object
     * @param ctx - The transaction context object
     * @param PropertyID - Identity of the property
     * @returns - Property Asset
     **/
    
     async viewProperty (ctx,
        propertyID)
    {
        // Create the composite key using property and fetch the buffer from chain
        const PropertyKey = ctx.stub.createCompositeKey('property-registration-network',[PropertyID]);
        let UserBuffer = await ctx.stub.getState(PropertyKey).catch(err =>console.log(err));

        let PropertyObj = JSON.parse(UserBuffer.toString());

        console.log(PropertyObj);
    }
}
class UserContract extends Contract {

    constructor(){
        super('property-registration-network');
    }

    /**
     * Initiated by user asking registrar to add them to the network
     * @param ctx - The transaction context object
     * @param Name - Name of the user
     * @param EmailId - Email Id of the user
     * @param PhoneNumber - Contact number of the user
     * @param AadharNumber - Aadhar number of the user
     * @param CreatedAt - Transaction creation Time stamp
     * @Returns Request object
     **/
    
    async requestNewUser(ctx,
        name,
        email,
        phone,
        aadhar,
        createdAt)
    {
        // Create a composite key using Name and aadhar values
        const UserKey = ctx.stub.createCompositeKey('property-registration-network',[]string{name,aadhar});

        // Get current time
        const Timenow =  new Date();

        // Create Request object
        let NewRequest = {
            Name : name,
            EmailId : email,
            PhoneNumber: phone,
            AadharNumber : aadhar,
            CreatedAt : Timenow
        }

        //Convert Json object to buffer
        let DataBuffer = Buffer.from(JSON.stringify(NewRequest));

        // Put it on blockchain for storage
        await ctx.stub.putState(UserKey, DataBuffer);

        return NewRequest;
    }
        /**
     * Initiated by user to add money to their account
     * @param ctx - The transaction context object
     * @param Name - Name of the user
     * @param AadharNumber - Aadhar number of the user
     * @param BanKTransactionId -Transaction id given by bank to the user upon receival of money
     * @Returns Request object
     **/
    async rechargeAccount (ctx,
                           name,
                           aadhar,
                           BankTransID)
    {
        // Checking if the transaction id is valid and deciding the upgrad coins to be updated
        const amount;
        switch(BankTransID) {
            case upg100:
                amount = 100;
                break;
            case upg500:
                amount = 500;
                break;
            case upg1000:
                amount = 1000;
                break;
            default:
                throw 'Invalid Bank Transaction ID';
            } 

        // Create a composite key using Name and aadhar values
        const UserKey = ctx.stub.createCompositeKey('property-registration-network',[]string{name,aadhar});

        let UserBuffer = await ctx.stub.getState(UserKey).catch(err =>console.log(err));

        let requestobj = JSON.parse(UserBuffer.toString());

        let UserAsset = {
            Name : requestobj.Name,
            EmailId : requestobj.EmailId,
            PhoneNumber: requestobj.PhoneNumber,
            AadharNumber : requestobj.AadharNumber,
            CreatedAt : requestobj.Timenow,
            upgradCoins : sum
        }
        //Convert Json object to buffer
        let DataBuffer = Buffer.from(JSON.stringify(UserAsset));

        // Put it on blockchain for storage
        await ctx.stub.putState(UserKey, DataBuffer);
    }

    /**
     * Initiated by user/registrar to view current state f user
     * @param ctx - The transaction context object
     * @param Name - Name of the user
     * @param AadharNumber - Aadhar number of the user
     **/
    
    async viewUser (ctx,
                name,
                aadhar)
    {
    // Get the user info using the composite key and Change it to json object
    const UserKey = ctx.stub.createCompositeKey('property-registration-network',[]string{name,aadhar});

    let UserBuffer = await ctx.stub.getState(UserKey).catch(err =>console.log(err));
    let userobj = JSON.parse(UserBuffer.toString());
    // Log the user object
    console.log(userobj);
        
    }
    /**
     * Initiated by user to register the details of property on network
     * @param ctx - The transaction context object
     * @param PropertyID - Identity of the property
     * @param Owner - Owner of the property
     * @param Price - Price of the property
     * @param Status - Status of the property. Can be 'registered'/'onSale'.
     **/
    
     async propertyRegistrationRequest (ctx,
        propertyID,
        Owner,
        price,
        status,
        Name,
        AadharNumber)
    {
        // Get the user info using the composite key. Give error if user is not on network
        const UserKey = ctx.stub.createCompositeKey('property-registration-network',[]string{Name,aadhar});

        let UserBuffer = await ctx.stub.getState(UserKey).catch(err =>console.log(err));
        let ProperyAsset = {
            PropertyID : propertyID,
            Owner: UserKey;
            Price : price,
            Status : status,
        }

        let DataBuffer = Buffer.from(JSON.stringify(ProperyAsset));
        const PropertyKey = ctx.stub.createCompositeKey('property-registration-network',[PropertyID]);

        // Put it on blockchain for storage
        await ctx.stub.putState(PropertyKey, DataBuffer);

        return ProperyAsset;
    }


    /**
     * Initiated by registrar/user to view property object
     * @param ctx - The transaction context object
     * @param PropertyID - Identity of the property
     * @returns - Property Asset
     **/
    
     async viewProperty (ctx,
        propertyID)
    {
        // Create the composite key using property and fetch the buffer from chain
        const PropertyKey = ctx.stub.createCompositeKey('property-registration-network',[PropertyID]);
        let UserBuffer = await ctx.stub.getState(PropertyKey).catch(err =>console.log(err));

        let PropertyObj = JSON.parse(UserBuffer.toString());

        console.log(PropertyObj);
    }

        /**
     * Initiated by registered user
     * @param ctx - The transaction context object
     * @param PropertyID - Identity of the property
     * @param Name - Name of the user
     * @param AadharNumber - Aadhar number of the user
     * @param Status - status of the property
     **/
    
     async updateProperty (ctx,
        propertyID,
        name,
        aadharnumber,
        status)
    {
        // Get the user info using the composite key. Give error if user is not on network
        const UserKey = ctx.stub.createCompositeKey('property-registration-network',[]string{name,aadharnumber});

        // Create the composite key using property and fetch the buffer from chain
        const PropertyKey = ctx.stub.createCompositeKey('property-registration-network',[PropertyID]);
        let UserBuffer = await ctx.stub.getState(PropertyKey).catch(err =>console.log(err));

        let PropertyObj = JSON.parse(UserBuffer.toString());

        if(PropertyObj.Owner == UserKey)
        {
            PropertyObj.Status = status;
        }
        else
        {
            throw('Caller is not the owner of the property. Can\'t  update Property');
        }
        //Convert Json object to buffer
        let DataBuffer = Buffer.from(JSON.stringify(PropertyObj));

        // Put it on blockchain for storage
        await ctx.stub.putState(PropertyKey, DataBuffer);

    }
        /**
     * Initiated by registered user
     * @param ctx - The transaction context object
     * @param PropertyID - Identity of the property
     * @param Name - Name of the user
     * @param AadharNumber - Aadhar number of the user
     * @param Status - status of the property
     **/
    
    async purchaseProperty (ctx,
            propertyID,
            name,
            aadharnumber)
    {
        const PropertyKey = ctx.stub.createCompositeKey('property-registration-network',[PropertyID]);
        let UserBuffer = await ctx.stub.getState(PropertyKey).catch(err =>console.log(err));

        let PropertyObj = JSON.parse(UserBuffer.toString());

        // Only go forward if the property is on sale
        if(PropertyObj.Status == 'onSale')
        {
            // Get the user info using the composite key. Give error if user is not on network
            const UserKey = ctx.stub.createCompositeKey('property-registration-network',[]string{name,aadharnumber});
            let UserBuffer = await ctx.stub.getState(UserKey).catch(err =>console.log(err));

            let UserObj = JSON.parse(UserBuffer.toString());

            if(UserObj.upgradCoins > PropertyObj.Price)
            {   
                // Get previous owner's info to update as well
                let previous_owner = PropertyObj.Owner;

                let Prev_owner_buffer = await ctx.stub.getState(previous_owner).catch(err =>console.log(err));
                let Prev_owner_obj = JSON.parse(Prev_owner_buffer.toString());

                // Update the owner of the property and update the upgrad coins for both the party
                UserObj.upgradCoins =- PropertyObj.Price;
                Prev_owner_obj.upgradCoins =+ PropertyObj.Price;
                PropertyObj.Owner = UserKey;
                PropertyObj.Status = 'registered';

                //// Update the ledger

                //Convert Json object to buffer
                let DataBuffer = Buffer.from(JSON.stringify(PropertyObj));
                // Put it on blockchain for storage
                await ctx.stub.putState(PropertyKey, DataBuffer);

                let DataBuffer = Buffer.from(JSON.stringify(Prev_owner_obj));
                // Put it on blockchain for storage
                await ctx.stub.putState(previous_owner, DataBuffer);

                let DataBuffer = Buffer.from(JSON.stringify(UserObj));
                // Put it on blockchain for storage
                await ctx.stub.putState(UserKey, DataBuffer);
            }
            else
            {
                console.log('Not sufficient balance');

            }
        
        }
        else
        {
            console.log('Property is not on sale');
        }
            
    }
}
module.exports.UserContract = UserContract;
module.exports.RegistrarContract = RegistrarContract;