---
layout: post
title: Django REST Framework like a ninja
---

Hello everyone. This post is to show you all the tricks that I've been learning until now about Django REST Framework and create the best api for your app :D

Check [this page](http://www.cdrf.co/3.4/index.html) is awesome, you can navigate through the DRF classes and check all the code :D Thanks to @_aericson at @vintasoftware

<!--more-->

## ViewSets(Model) ##

You can overwrite any function that I will mention, in the ViewSet class.

```python
class UserViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    serializer_class = UserSerializer
    queryset = User.objects.all()
```


**-The simpliest model viewset**

```python
class UserViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    serializer_class = UserSerializer
    queryset = User.objects.all()
```

**-Use a serializers according to the request**

```python
def get_serializer_class(self):
    if self.action == 'list':
        return CustomListSerializer
    if self.action == 'create':
        return CustomistCreateSerializer
    if self.action == 'retrieve':
        return CustomRetrieveSerializer
    if self.action == 'update':
        return CustomUpdateSerializer
    if self.action == 'partial_update':
        return CustomPartialUpdateSerializer
    if self.action == 'destroy':
        return CustomDestroySerializer
    return CustomNormalSerializer
```

**-Custom each request**

The belows functions are the real one of DRF, you can edit them and overwrite as your needs

```python
def list(self, request, *args, **kwargs):
    queryset = self.filter_queryset(self.get_queryset())

    page = self.paginate_queryset(queryset)
    if page is not None:
        serializer = self.get_serializer(page, many=True)
        return self.get_paginated_response(serializer.data)

    serializer = self.get_serializer(queryset, many=True)
    return Response(serializer.data)
```
<br />
```python
def create(self, request, *args, **kwargs):
    serializer = self.get_serializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    self.perform_create(serializer)
    headers = self.get_success_headers(serializer.data)
    return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
```
<br />
```python    
def retrieve(self, request, *args, **kwargs):
    instance = self.get_object()
    serializer = self.get_serializer(instance)
    return Response(serializer.data)
```
<br />
```python
def update(self, request, *args, **kwargs):
    partial = kwargs.pop('partial', False)
    instance = self.get_object()
    serializer = self.get_serializer(instance, data=request.data, partial=partial)
    serializer.is_valid(raise_exception=True)
    self.perform_update(serializer)

    if getattr(instance, '_prefetched_objects_cache', None):
        # If 'prefetch_related' has been applied to a queryset, we need to
        # refresh the instance from the database.
        instance = self.get_object()
        serializer = self.get_serializer(instance)

    return Response(serializer.data)
```
<br />
```python
def partial_update(self, request, *args, **kwargs):
    kwargs['partial'] = True
    return self.update(request, *args, **kwargs)
```
<br />
```python
def destroy(self, request, *args, **kwargs):
    instance = self.get_object()
    self.perform_destroy(instance)
    return Response(status=status.HTTP_204_NO_CONTENT)
```        

**-Create a post list like this:**

```json
[
    {
        "id": 26,
        "workShiftStart": "2017-02-02",
        "workShiftEnd": "2018-02-02",
        "personStart": "2018-02-02",
        "workShift": 74,
        "person": {
            "id": 206,
            "nombre": "NICOLAS"
        }
    },
    {
        "id": 27,
        "workShiftStart": "2018-02-02",
        "workShiftEnd": "2018-02-02",
        "personStart": "2018-03-01",
        "workShift": 74,
        "person": {
            "id": 112,
            "nombre": "Pablo"
        }
    },
]
```

Where each JSON Object is a model in our Django models. So to create a list where you create all the elements, or none elements (atomic creation) we have to overwrite the *create* function of our *ViewSet* Class

```python
def create(self, request):
    serializer = WorkShiftPersonCreateSerializer(data=request.data, many=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
```

Here, the key is the *many=True* that create a serialize that contain many objects and then you can process them like just one object but they are multiples objects.

## Serializers ##

**-Create an array of objects in a object like this:**

```json
{
    "name": "Turno raro",
    "holidaysConsider": false,
    "tolerance": 5,
    "shiftType": "R",
    "days": [
        {
            "hasSnack": false,
            "snackTime": 2.0,
            "workShiftDay": "1",
            "start": "00:00:00",
            "end": "23:59:00",
            "workDay": true
        },
        {
            "hasSnack": false,
            "snackTime": 2.0,
            "workShiftDay": "1",
            "start": "00:00:00",
            "end": "23:59:00",
            "workDay": true
        }
    ]
}
```

where this JSON is a workshift that contain days, and you can to save the workshift but also each day with DRF as well and make the relation with the workshift that is a FK(Foreign Key) relation. The way to do that is overwritting the create method in the workshift serializer:

```python
class WorkShiftSerializer(serializers.ModelSerializer):

    days = DayWorkShiftSerializer(many=True, read_only=False)

    class Meta:
        model = WorkShift
        fields = ('id','name','holidaysConsider','tolerance','shiftType', 'days')
        read_only_fields = ('id',)

    def create(self, validated_data):
        days = validated_data.pop('days')
        workShift = WorkShift.objects.create(**validated_data)
        for day in days:
            Day.objects.create(workShift=workShift, **day)
        return workShift
```

Here in the *create* function, we'll recieve the data(JSON) and we will *pop* the days. Then create the workshift that will have this data:

```json
{
    "name": "Turno raro",
    "holidaysConsider": false,
    "tolerance": 5,
    "shiftType": "R",
}
```

and then for each day, create it and make the relations :D

## Routings ##
