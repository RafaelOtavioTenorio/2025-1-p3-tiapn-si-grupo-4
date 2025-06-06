# Get the Ubuntu version code name (e.g., 'jammy' for Ubuntu 22.04, which Linux Mint is based on)
# You might need to check your specific Linux Mint version's Ubuntu base.
# For Linux Mint 21.x, it's 'jammy'. For Mint 20.x, it's 'focal'.
# Let's assume 'jammy' for a recent Mint.
# Replace 'jammy' with your actual Ubuntu codename if different.
UBUNTU_CODENAME=$(lsb_release -cs)

# Download Microsoft signing key and add it to trusted keys
wget https://packages.microsoft.com/config/ubuntu/${UBUNTU_CODENAME}/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
sudo dpkg -i packages-microsoft-prod.deb
rm packages-microsoft-prod.deb

# Update the package list
sudo apt update