from app.models import db, Comment

def seed_comments():
    comment1 = Comment(
    user_id = 2,
    post_id = 1,
    body = "Yeah, especially during Covid! I'm glad you have a great time with your family! Enjoy :)"
    )

    comment2 = Comment(
    user_id = 3,
    post_id = 1,
    body = "I'm so happy for you! Enjoy your quality time. Tell Hannah I say hi, will you!"
    )

    comment3 = Comment(
    user_id = 4,
    post_id = 1,
    body = "Enjoy your time! We'll miss you!"
    )

    comment4 = Comment(
    user_id = 1,
    post_id = 2,
    body = 'Absolutely!'
    )

    comment5 = Comment(
    user_id = 3,
    post_id = 2,
    body = 'What are you reading?'
    )

    # comment6 = Comment (
    # user_id = 4,
    # post_id = 2,
    # body = ''
    # )

    # comment7 = Comment(
    # user_id = 1
    # post_id = 3
    # body = ''
    # )

    # comment8 = Comment(
    # user_id = 2
    # post_id = 3
    # body = ''
    # )

    # comment9 = Comment(
    # user_id = 4
    # post_id = 3
    # body = ''
    # )

    # comment10 = Comment(
    # user_id = 1
    # post_id = 4
    # body = ''
    # )

    # comment11 = Comment(
    # user_id = 2
    # post_id = 4
    # body = ''
    # )

    # comment12 = Comment(
    # user_id = 3
    # post_id = 4
    # body = ''
    # )

    # comment13 = Comment(
    # user_id = 2
    # post_id = 5
    # body = ''
    # )

    # comment14 = Comment(
    # user_id = 3
    # post_id = 5
    # body = ''
    # )

    # comment15 = Comment(
    # user_id = 4
    # post_id = 5
    # body = ''
    # )

    # comment16 = Comment(
    # user_id = 1
    # post_id = 6
    # body = ''
    # )

    # comment17 = Comment(
    # user_id = 3
    # post_id = 6
    # body = ''
    # )

    # comment18 = Comment(
    # user_id = 4
    # post_id = 6
    # body = ''
    # )

    # comment19 = Comment(
    # user_id = 1
    # post_id = 7
    # body = ''
    # )

    # comment20 = Comment(
    # user_id = 2
    # post_id = 7
    # body = ''
    # )

    # comment21 = Comment(
    # user_id = 4
    # post_id = 7
    # body = ''
    # )

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add(comment4)
    db.session.add(comment5)
    # db.session.add(comment6)
    # db.session.add(comment7)
    # db.session.add(comment8)
    # db.session.add(comment9)
    # db.session.add(comment10)
    # db.session.add(comment11)
    # db.session.add(comment12)
    # db.session.add(comment13)
    # db.session.add(comment14)
    # db.session.add(comment15)
    # db.session.add(comment16)
    # db.session.add(comment17)
    # db.session.add(comment18)
    # db.session.add(comment19)
    # db.session.add(comment20)
    # db.session.add(comment21)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
