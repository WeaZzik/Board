from tkinter import * 
from tkinter import ttk
from tkinter.messagebox import *
import os
import random
import string
import time

def main():
    global PRENOM
    global NOM
    global MATRICULE
    global DDNAISSANCE
    global DESCRIPTION
    global Mail
    global GROLE
    global PATH1
    global PATH2
    global PATH3
    global PATH4
    global PATH5
    global STOP
    
    screen = Tk()
    screen.title('ADUsers Management')
    screen.resizable(width=FALSE, height=FALSE)
    screen.geometry('{}x{}'.format(700, 100))

    GroupRoles = ('Internes', 'Medecins', 'Autre')
    GROLE = StringVar()
    Mail = IntVar()
    STOP = 0
    
    PRENOMTXT = Label(screen, text='Prénom')
    NOMTXT = Label(screen, text='Nom')
    MATRICULETXT = Label(screen, text='Matricule')
    DDNAISSANCETXT = Label(screen, text='Date Naissance')
    DESCRIPTIONTXT = Label(screen, text='Description')
    MAILTXT = Label(screen, text='Mail')
    ROLETXT = Label(screen, text='GroupRôle')
    PATHTXT = Label(screen, text='> PATH :',fg="red")
    LINE = Label(screen, text=' ')

    LINE.grid(row=2,column=0)
    PRENOMTXT.grid(row=0,column=1)
    NOMTXT.grid(row=0,column=2)
    MATRICULETXT.grid(row=0,column=3)
    DDNAISSANCETXT.grid(row=0,column=4)
    DESCRIPTIONTXT.grid(row=0,column=5)
    MAILTXT.grid(row=0,column=6)
    ROLETXT.grid(row=0,column=7)
    PATHTXT.grid(row=3,column=0)

    PRENOM = Entry(screen, width=15)
    PRENOM.grid(row=1,column=1)

    NOM = Entry(screen, width=15)
    NOM.grid(row=1,column=2)

    MATRICULE = Entry(screen, width=15)
    MATRICULE.grid(row=1,column=3)

    DDNAISSANCE = Entry(screen, width=15)
    DDNAISSANCE.grid(row=1,column=4)

    DESCRIPTION = Entry(screen, width=15)
    DESCRIPTION.grid(row=1,column=5)

    MAIL = Checkbutton(screen,variable=Mail,onvalue=1,offvalue=0)
    MAIL.grid(row=1,column=6)

    ROLE = ttk.Menubutton(screen, text = "SELECT") 
    ROLE.menu = Menu(ROLE, tearoff=0)
    ROLE['menu'] = ROLE.menu
    for GroupRole in GroupRoles:
        ROLE.menu.add_radiobutton(
        label=GroupRole,
        value=GroupRole,
        variable=GROLE)
    ROLE.grid(row=1,column=7)

    PATH1 = Entry(screen, width=14)
    PATH1.insert(END, 'ch-hautanjou.fr')
    PATH2 = Entry(screen, width=14)
    PATH2.insert(END, 'Services')
    PATH3 = Entry(screen, width=14)
    PATH4 = Entry(screen, width=14)
    PATH5 = Entry(screen, width=14)
    PATH1.grid(row=3,column=1)
    PATH2.grid(row=3,column=2)
    PATH3.grid(row=3,column=3)
    PATH4.grid(row=3,column=4)
    PATH5.grid(row=3,column=5)
    def CSV():
        Input= open("import.txt","w+")
        
        a = '''
        Import-Module ActiveDirectory
        
        $Server = '192.168.2.40'
        
        $CSVFile = "User.csv"
        $CSVData = Import-CSV -Path $CSVFile -Delimiter ";" -Encoding UTF8

        Foreach($Utilisateur in $CSVData){
        
            $UtilisateurLogin = $Utilisateur.Login
            $UtilisateurPrenom = $Utilisateur.Prenom
            $UtilisateurNom = $Utilisateur.Nom
            $UtilisateurMatricule = $Utilisateur.Matricule
            $UtilisateurPassword = $Utilisateur.Password
            $UtilisateurDDNaissance = $Utilisateur.DDNaissance
            $UtilisateurDescription = $Utilisateur.Description
            $UtilisateurMail = $Utilisateur.Mail
            $UtilisateurGroupRole = $Utilisateur.GroupRole
            $UtilisateurInitiale = $Utilisateur.Initiale
            $UtilisateurNumber = $Utilisateur.Number
            $Path = $Utilisateur.Path
            
            if (Get-ADUser -Filter {SamAccountName -eq $UtilisateurLogin})
            {
                Write-Warning "L'identifiant $UtilisateurLogin existe déjà dans l'AD"
            }
            else
            {
                New-ADUser -Name "$UtilisateurPrenom $UtilisateurInitiale $UtilisateurNom" `
                            -DisplayName "$UtilisateurNom $UtilisateurPrenom" `
                            -GivenName $UtilisateurPrenom `
                            -Surname $UtilisateurNom `
                            -SamAccountName $UtilisateurLogin `
                            -UserPrincipalName "$UtilisateurPrenom $UtilisateurInitiale $UtilisateurNom" `
                            -EmailAddress $UtilisateurMail `
                            -Path $Path `
                            -AccountPassword(ConvertTo-SecureString $UtilisateurPassword -AsPlainText -Force) `
                            -ChangePasswordAtLogon $true `
                            -Enabled $true `
                            -CannotChangePassword $true `
                            -PasswordNeverExpires $true `
                            -Employeeid $UtilisateurMatricule `
                            -Employeenumber $UtilisateurNumber `
                            
                if ($UtilisateurGroupRole -eq "Internes"){
                
                }
                
                if ($UtilisateurGroupRole -eq "Medecins"){
                
                }
            }
        }'''
        
        Input.write(a)
        Input.close()
        time.sleep(2)
        os.rename('import.txt', 'import.ps1')
        time.sleep(2)  
    def Valider():

        global PRENOM
        global NOM
        global MATRICULE
        global DDNAISSANCE
        global DESCRIPTION
        global Mail
        global GROLE
        global PATH1
        global PATH2
        global PATH3
        global PATH4
        global PATH5
        global STOP

        Prenom = PRENOM.get()
        Nom = NOM.get()
        Matricule = MATRICULE.get()
        DDNaissance = DDNAISSANCE.get()
        Description = DESCRIPTION.get()
        
        CDDN = len(DDNaissance)
        
        GRole = GROLE.get()
        Path1 = PATH1.get()
        Path2 = PATH2.get()
        Path3 = PATH3.get()
        Path4 = PATH4.get()
        Path5 = PATH5.get()
        
        Path = "OU="+Path5+",OU="+Path4+",OU="+Path3+",DC="+Path2+",DC="+Path1
    
        if Prenom == "" or Nom == "" or Matricule == "" or DDNaissance == "" or Path1 == "" or Path2 == "" or Path3 == "" or Path4 == "" or Path5 == "":
            showwarning('Erreur', 'Certains Champs ne sont pas remplis')
            screen.destroy()
            main()
        elif DDNaissance.isnumeric() == False or CDDN != 8:
            showwarning('Erreur', 'Erreur dans la Date de Naissance')
            screen.destroy()
            main()
        elif Matricule.isnumeric() == False:
            showwarning('Erreur', 'Erreur dans le Numéro de Matricule')
            screen.destroy()
            main()
        else:
            Login = Prenom[0] + Nom
            LoginMaj = Login.upper()
            LoginMin = Login.lower()
            NomMin = Nom.lower()
            Nom = Nom.upper()
            PrenomMin = Prenom.lower()
            Prenom = Prenom.title()
            Initiale2 = Prenom[0] + Nom[0]
            Initiale = Initiale2.upper()
            UNumber = PrenomMin+NomMin+DDNaissance
            letters = string.ascii_lowercase
            MotdePasse = ''.join(random.choice(letters) for i in range(8))
            DDN = DDNaissance[0] + DDNaissance[1] + "/" + DDNaissance[2] + DDNaissance[3] + "/" + DDNaissance[4] + DDNaissance[5] + DDNaissance[6] + DDNaissance[7]
            if Mail.get() == 1:
                Mail = LoginMin+"@ch-hautanjou.fr"
        
            if askyesno('Confirmation', "Prénom: "+Prenom +"\nNom: " +Nom +"\nLogin: " +LoginMin +"\nMot de Passe: " +MotdePasse +"\nMatricule: " +Matricule +"\nDate de Naissance: " +DDN +"\nDescription: " +Description +"\nMail: " +Mail +"\nGroupRôle: " +GRole +"\n\nPATH:" +"\nDC="+Path1 +"\nDC="+Path2 +"\nOU="+Path3 +"\nOU="+Path4 +"\nOU="+Path5):
                screen.destroy()
                if os.path.isfile("Output.txt"):
                    os.remove("Output.txt")
                Output= open("Output.txt","w+")
                Output.write("Login;Prenom;Nom;Matricule;Password;DDNaissance;Description;Mail;GroupRole;Initiale;Number;Path\n")
                Output.write(LoginMin+";"+Prenom+";"+Nom+";"+Matricule+";"+MotdePasse+";"+DDNaissance+";"+Description+";"+Mail+";"+GRole+";"+Initiale+";"+UNumber+";"+Path)
                Output.close()
                os.rename('Output.txt', 'User.csv')
                time.sleep(2)
                CSV()
            else:
                screen.destroy()
                main()
                
    BTNVALIDER = Button(screen, text='VALIDER', command=Valider)
    BTNVALIDER.grid(row=2,column=10)

    if STOP == 1:
        screen.destroy()

    screen.mainloop()
    
main()