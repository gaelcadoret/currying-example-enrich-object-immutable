
(() => {
    console.log("start script...");

    const activityMapping = {
        "6202A": "Service de développement en informatique",
        "11": "Activité commerciale (VPC)",
    };
    console.log("activityMapping", activityMapping);

    const members = [
        { 
            _idOld: '10557',
            activity: '11',
            address1: '40 rue de l\'Est',
            address2: '',
            birthdate: '0000-00-00',
            city: 'Boulogne Billancourt',
            civility: 'mlle',
            country: 'France',
            cp: '92100',
            createdAt: '2014-01-28 21:48:27',
            diffusionMembre: 'non',
            email: 'laurene@dacor.fr',
            enterprise: 'DACOR FILMS',
            fax: '',
            firstName: 'Laurène',
            isAccountValid: 'non',
            lastName: 'Bitan',
            login: 'Dacorfilms',
            optIn: 'non',
            password: '9554000ca50b451e11ad2264b9759839',
            phone1: '0149099995',
            phone2: '',
            profilType: 'projet',
            promoExpiredAt: '0000-00-00',
            promoMember: '0',
            promocode: '',
            website: ''
        },
        { 
            _idOld: '10558',
            activity: '6202A',
            address1: '25 rue de l\'Ouest',
            address2: '',
            birthdate: '0000-00-00',
            city: 'Paris',
            civility: 'Mr',
            country: 'France',
            cp: '75015',
            createdAt: '2014-01-28 21:48:27',
            diffusionMembre: 'oui',
            email: 'bdupond@free.fr',
            enterprise: 'INGIN',
            fax: '',
            firstName: 'Gael',
            isAccountValid: 'oui',
            lastName: 'Cadoret',
            login: 'gagou',
            optIn: 'oui',
            password: '9554000ca50b451e11ad2264b9759839',
            phone1: '0149099995',
            phone2: '',
            profilType: 'projet',
            promoExpiredAt: '0000-00-00',
            promoMember: '0',
            promocode: '',
            website: ''
        }
    ];

    console.log("members", members);  

    const memberTpl = {
        "_idOld": "_idOld",
        "civ": member => member["civility"] === "Mr" ? "male" : "female",
        "name": "lastName",
        "firstName": "firstName",
        "society": "enterprise",
        "birthDate": "birthdate",
        "addresse": "address1",        
        "cp": "cp",
        "ville": "city",
        "pays": "country",
        "phone": "phone1",               
        "email": "email",
        "password": "password",
        "firebaseId": () => "",
        "role" : () => "MEMBER",
        "website": "website",
        "profil": "profilType",
        "activite": member => activityMapping[member["activity"]],
        "pseudo": "login",
        "createdAt": "createdAt",
        "newsletter": member => member["diffusionMembre"] === "oui",
        "accountVerified": member => member["isAccountValid"] === "oui",
        "optIn": member => member["optIn"] === "oui",       
        "promoExpiredAt": "promoExpiredAt"
    };

    const isFunc = val => typeof val === "function";

    const makeObj = (key, value) => data => ({ [key]: isFunc(value) ? value(data) : data[value] });    

    const mergeProps = (acc, obj) => ({ ...acc, ...obj });

    const parseTemplateProperties = member => Object.entries(memberTpl).map(([key, value]) => makeObj(key, value)(member))

    // @param {object} member - objet original
    // @return {object} - renvoi l'objet bien formaté
    const formatMember = member => parseTemplateProperties(member).reduce(mergeProps, {});

    // @param {array<object>} members - liste des membres
    // @return {array<object>} - renvoi un tableau d'objet bien formatés
    const formatMembers = members => members.map(formatMember);

    console.time("map_reduce");
    const formattedMembers = formatMembers(members);
    console.timeEnd("map_reduce");

    console.log("formattedMembers", formattedMembers);

    return "End";
})();
