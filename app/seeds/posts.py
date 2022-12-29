from app.models import db, Post

def seed_posts():
    post1 = Post(
        user_id=1,
        body= "The most happiest moment is to gather with my family. It's been a long time since I have not gone back home. "
    )
    post2 = Post(
        user_id=2,
        body= "I love it when I could have some time reading good books and enjoying a cup of tea. This area is one of my favorite in my house"
    )
    post3 = Post(
        user_id=3,
        body= "We still go with our Hawaii plan eventhough by the time we’re back it’ll be move day the next day! However, we had so much fun in Maui. Such a nice treat before the big move!"
    )
    post4 = Post(
        user_id=4,
        body= "Jayden and daddy"
    )
    post5 = Post(
        user_id=1,
        body= "I can’t believe I could wipe each of the leaves as if I have all of the time in the world 😂"
    )
    post6 = Post(
        user_id=2,
        body= 'One of my favorite location to visit!'
    )
    post7 = Post(
        user_id=3,
        body= "Since when my baby boy becomes an adventurous person? We’ve never bring him to these type of activities before but I heard from the counselor that he’s so enthusiastic & did it all with no hesitation. I’m so glad he finally gets to do something fun for the summer before school starts 🙂"
    )
    post8 = Post(
        user_id=4,
        body= 'Here are our last memories of Alameda... I want you all to know we are grateful you come to our life and we had a lot of bonding memories during our journey in CA. You guys are one of the nicest people I’ve ever known in my life. I miss you all already…'
    )

    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)
    db.session.add(post4)
    db.session.add(post5)
    db.session.add(post6)
    db.session.add(post7)
    db.session.add(post8)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
