from django.db import models
from core.models import TimestampedModel

class Worker(TimestampedModel):
    user = models.OneToOneField(
        'authentication.User', on_delete=models.CASCADE
    )
    Dni = models.TextField(blank=True)
    
    def __str__(self):
        return self.user.username

