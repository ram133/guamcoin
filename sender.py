# https://ram133.github.io/guamcoin
import os
from datetime import datetime

LOG_FILE = "contact_log.txt"
MESSAGE = "Check your coin balance at https://ram133.github.io/guamcoin"

def get_already_contacted():
    contacted = set()
    if os.path.exists(LOG_FILE):
        with open(LOG_FILE, "r") as f:
            for line in f:
                if "Contacted: " in line:
                    num = line.split("Contacted: ")[-1].strip()
                    contacted.add(num)
    return contacted

def log_contact(phone_number):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    log_entry = f"[{timestamp}] Contacted: {phone_number}\n"
    print(log_entry.strip())
    with open(LOG_FILE, "a") as f:
        f.write(log_entry)

def generate_guam_numbers():
    prefixes = ["787", "646", "648", "688", "734", "300", "487", "989"]
    numbers = []
    for prefix in prefixes:
        for i in range(100, 1000):
            numbers.append(f"671{prefix}{i:04d}")
    return numbers

def main():
    already_contacted = get_already_contacted()
    all_numbers = generate_guam_numbers()
    
    batch_size = 5
    count = 0
    
    for number in all_numbers:
        if number in already_contacted:
            continue
        if count >= batch_size:
            break
            
        log_contact(number)
        count += 1

if __name__ == "__main__":
    main()
