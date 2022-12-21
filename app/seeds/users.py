from app.models import db, User
from datetime import date

# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name='Demo',
        last_name='User',
        username='Demo',
        email='demo@aa.io',
        password='password',
        birthday= date(1990,4,4),
        gender='female'
        )

    marnie = User(
        first_name='Marnie',
        last_name='Molly',
        username='marnie',
        email='marnie@aa.io',
        password='password',
        birthday= date(1990,4,4),
        gender='female'
        )

    bobbie = User(
        first_name='Bobbie',
        last_name='Brown',
        username='bobbie',
        email='bobbie@aa.io',
        password='password',
        birthday= date(1990,4,4),
        gender='male'
        )

    john = User(
        first_name='John',
        last_name='Smith',
        username='JohnS',
        email='john@gmail.com',
        password='password',
        birthday= date(1990,4,4),
        gender='male'
        )

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(john)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
