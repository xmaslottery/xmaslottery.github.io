class Contact:
    def __init__(self, phone, name, color):
        self.phone = phone
        self.name = name
        self.color = color

contacts = []

for i in range(1000):
    phone_number = f"{i+1:04d}"
    contact = Contact(phone_number, "", "verde")
    contacts.append(contact)
for i in range(100):
    phone_number = f"{i+101:04d}"
    contact = Contact(phone_number, "", "rosa")
    contacts.append(contact)
for i in range(100):
    phone_number = f"{i+1:04d}"
    contact = Contact(phone_number, "", "bianco")
    contacts.append(contact)
for i in range(100):
    phone_number = f"{i+1:04d}"
    contact = Contact(phone_number, "", "azzurro")
    contacts.append(contact)




string = "var member = ["
for contact in contacts:
    newobj= '{ "phone":  "' +  contact.phone + '", "name":  "' + contact.phone + '",' + '"color": "' + contact.color + '"},'
    string+=newobj
string = string[:-1]
string+= "]"
with open('member.js', 'w') as f:
    f.write(string)
