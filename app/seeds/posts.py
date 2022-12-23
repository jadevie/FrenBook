from app.models import db, Post

def seed_posts():
    post1 = Post(
        user_id=1,
        body= 'Today is a great day'
    )
    post2 = Post(
        user_id=2,
        body= "I love it when it's snow"
    )
    post3 = Post(
        user_id=3,
        body= "It's raining now"
    )
    post4 = Post(
        user_id=4,
        body= "Christmas is coming"
    )
    post5 = Post(
        user_id=1,
        body= 'Today is a another good day'
    )
    post6 = Post(
        user_id=2,
        body= 'Hanging out with my son.'
    )
    post7 = Post(
        user_id=3,
        body= 'What are you thinking of life in general?'
    )
    post8 = Post(
        user_id=4,
        body= 'Nothing else matter.'
    )
    post9 = Post(
        user_id=1,
        body= 'I have been dreaming.'
    )
    post10 = Post(
        user_id=2,
        body= "It's ok to not feel ok!"
    )

    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)
    db.session.add(post4)
    db.session.add(post5)
    db.session.add(post6)
    db.session.add(post7)
    db.session.add(post8)
    db.session.add(post9)
    db.session.add(post10)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
