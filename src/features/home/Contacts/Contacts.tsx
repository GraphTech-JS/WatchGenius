import React from "react";
import { BgWatch } from "../../../../public/contacts";
import styles from "./Contacts.module.css";
import { Button } from "@/components/Button/Button";

export const Contacts = () => {
  return (
    <section className={styles.contacts} id="contacts">
      <div className={styles.contactsContent}>
        <div className={styles.contactsText}>
          <h2 className={styles.contactsTitle}>
            Залиште заявку — ми зв’яжемося з вами
          </h2>
          <p className={styles.contactsSubtitle}>
            Підкажемо, допоможемо з вибором, відповімо на всі запитання.
          </p>
        </div>
        <form className={styles.contactsForm}>
          <div className={styles.contactsTextFields}>
            <input
              type="text"
              className={styles.textField}
              placeholder="Ім'я"
              required
            />
            <input
              type="email"
              className={styles.textField}
              placeholder="Email"
              required
            />
          </div>
          <Button
            type="submit"
            variant="solid"
            bgColor="#fff"
            color="#000"
            classNames={styles.contactsBtn}
          >
            Відправити
          </Button>
        </form>
      </div>
      <img src={BgWatch.src} alt="watch bg" className={styles.contactsImg} />
    </section>
  );
};
