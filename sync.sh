#Watch web folder
if [ "$1" = "local" ]
then
    echo "Copying files to local diskstation ..."

    rsync -avz --delete --exclude-from=".syncignore" * "/Volumes/CompanyData/Clients/Jn Electrical/04 Web Files/crm.jnelectricalcontractors.co.uk"
else
    echo "Copying files to development server ..."
    
fi